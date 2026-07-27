import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import fs from "node:fs";
import path from "node:path";
import { defineConfig, type Plugin, type ViteDevServer } from "vite";
import { vitePluginManusRuntime } from "vite-plugin-manus-runtime";

// =============================================================================
// Manus Debug Collector - Vite Plugin
// Writes browser logs directly to files, trimmed when exceeding size limit
// =============================================================================

const PROJECT_ROOT = import.meta.dirname;
const LOG_DIR = path.join(PROJECT_ROOT, ".manus-logs");
const MAX_LOG_SIZE_BYTES = 1 * 1024 * 1024; // 1MB
const TRIM_TARGET_BYTES = Math.floor(MAX_LOG_SIZE_BYTES * 0.6);

type LogSource = "browserConsole" | "networkRequests" | "sessionReplay";

function ensureLogDir() {
  if (!fs.existsSync(LOG_DIR)) {
    fs.mkdirSync(LOG_DIR, { recursive: true });
  }
}

function trimLogFile(logPath: string) {
  try {
    if (!fs.existsSync(logPath)) return;

    const stat = fs.statSync(logPath);
    if (stat.size <= MAX_LOG_SIZE_BYTES) return;

    const lines = fs.readFileSync(logPath, "utf-8").split("\n");
    const kept: string[] = [];
    let size = 0;

    for (let i = lines.length - 1; i >= 0; i--) {
      const line = `${lines[i]}\n`;
      const bytes = Buffer.byteLength(line);
      if (size + bytes > TRIM_TARGET_BYTES) break;
      kept.unshift(lines[i]);
      size += bytes;
    }

    fs.writeFileSync(logPath, kept.join("\n"), "utf-8");
  } catch {
    /* ignore */
  }
}

function writeToLogFile(source: LogSource, entries: unknown[]) {
  if (!entries.length) return;

  ensureLogDir();
  const logPath = path.join(LOG_DIR, `${source}.log`);

  const lines = entries.map((entry) => {
    return `[${new Date().toISOString()}] ${JSON.stringify(entry)}`;
  });

  fs.appendFileSync(logPath, `${lines.join("\n")}\n`, "utf-8");
  trimLogFile(logPath);
}

function vitePluginManusDebugCollector(): Plugin {
  return {
    name: "manus-debug-collector",

    transformIndexHtml(html) {
      if (process.env.NODE_ENV === "production") return html;

      return {
        html,
        tags: [
          {
            tag: "script",
            attrs: {
              src: "/__manus__/debug-collector.js",
              defer: true,
            },
            injectTo: "head",
          },
        ],
      };
    },

    configureServer(server: ViteDevServer) {
      server.middlewares.use("/__manus__/logs", (req, res, next) => {
        if (req.method !== "POST") return next();

        let body = "";
        req.on("data", (chunk) => (body += chunk.toString()));
        req.on("end", () => {
          try {
            const payload = JSON.parse(body);

            if (payload.consoleLogs?.length)
              writeToLogFile("browserConsole", payload.consoleLogs);
            if (payload.networkRequests?.length)
              writeToLogFile("networkRequests", payload.networkRequests);
            if (payload.sessionEvents?.length)
              writeToLogFile("sessionReplay", payload.sessionEvents);

            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ success: true }));
          } catch (e) {
            res.writeHead(400, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ success: false, error: String(e) }));
          }
        });
      });
    },
  };
}

const plugins = [
  react(),
  tailwindcss(),
  vitePluginManusRuntime(),
  vitePluginManusDebugCollector(),
];

export default defineConfig(({ command }) => ({
  // Serve from root by default to avoid 404 on Render.
  // If you need a sub-path (e.g. '/leao_portfolio/'), change this value accordingly.
  base: process.env.NODE_ENV === "production" ? "/leao_portfolio/" : "/",

  plugins,

  // Project's client folder (adjust only if your frontend isn't in `client/`)
  root: path.resolve(PROJECT_ROOT, "client"),

  // Read env files from project root
  envDir: PROJECT_ROOT,

  resolve: {
    alias: {
      "@": path.resolve(PROJECT_ROOT, "client/src"),
      "@shared": path.resolve(PROJECT_ROOT, "shared"),
    },
  },

  build: {
    // Render expects the publish directory to be `dist` by convention.
    outDir: path.resolve(PROJECT_ROOT, "dist"),
    emptyOutDir: true,
  },

  server: {
    port: 3000,
    host: true,
    strictPort: false,
    allowedHosts: [
      ".manuspre.computer",
      ".manus.computer",
      ".manus-asia.computer",
      ".manuscomputer.ai",
      ".manusvm.computer",
      "localhost",
      "127.0.0.1",
    ],
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
}));
