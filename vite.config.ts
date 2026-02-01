<<<<<<< HEAD
import tailwindcss from "@tailwindcss/vite";
=======
>>>>>>> 09f93b4d34a40c8ad4f5fa6d2f85ea2cefb3cbaf
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig, type Plugin, type ViteDevServer } from "vite";
import { vitePluginManusRuntime } from "vite-plugin-manus-runtime";

// -----------------------------------------------------------------------------
// __dirname fix para ESM
// -----------------------------------------------------------------------------
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

<<<<<<< HEAD
const PROJECT_ROOT = import.meta.dirname;
const LOG_DIR = path.join(PROJECT_ROOT, ".manus-logs");
const MAX_LOG_SIZE_BYTES = 1 * 1024 * 1024; // 1MB
const TRIM_TARGET_BYTES = Math.floor(MAX_LOG_SIZE_BYTES * 0.6);

type LogSource = "browserConsole" | "networkRequests" | "sessionReplay";
=======
// -----------------------------------------------------------------------------
// Manus Debug Collector (DEV ONLY)
// -----------------------------------------------------------------------------
const LOG_DIR = path.join(__dirname, ".manus-logs");
>>>>>>> 09f93b4d34a40c8ad4f5fa6d2f85ea2cefb3cbaf

function ensureLogDir() {
  if (!fs.existsSync(LOG_DIR)) {
    fs.mkdirSync(LOG_DIR, { recursive: true });
  }
}

<<<<<<< HEAD
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

=======
>>>>>>> 09f93b4d34a40c8ad4f5fa6d2f85ea2cefb3cbaf
function vitePluginManusDebugCollector(): Plugin {
  return {
    name: "manus-debug-collector",

    transformIndexHtml(html) {
<<<<<<< HEAD
=======
      // ⚠️ NÃO injeta em produção (Render)
>>>>>>> 09f93b4d34a40c8ad4f5fa6d2f85ea2cefb3cbaf
      if (process.env.NODE_ENV === "production") return html;

      return {
        html,
        tags: [
          {
            tag: "script",
            attrs: { src: "/__manus__/debug-collector.js", defer: true },
            injectTo: "head",
          },
        ],
      };
    },

    configureServer(server: ViteDevServer) {
      server.middlewares.use("/__manus__/logs", (req, res, next) => {
        if (req.method !== "POST") return next();

        let body = "";
<<<<<<< HEAD
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
=======
        req.on("data", (chunk) => (body += chunk));
        req.on("end", () => {
          ensureLogDir();
          fs.appendFileSync(
            path.join(LOG_DIR, "browserConsole.log"),
            body + "\n"
          );
          res.end(JSON.stringify({ success: true }));
>>>>>>> 09f93b4d34a40c8ad4f5fa6d2f85ea2cefb3cbaf
        });
      });
    },
  };
}

<<<<<<< HEAD
const plugins = [
  react(),
  tailwindcss(),
  vitePluginManusRuntime(),
  vitePluginManusDebugCollector(),
];

export default defineConfig(({ command }) => ({
  base: command === "build" ? "/leao_portfolio/" : "/",

  plugins,

  root: path.resolve(PROJECT_ROOT, "client"),

  envDir: PROJECT_ROOT,

  resolve: {
    alias: {
      "@": path.resolve(PROJECT_ROOT, "client/src"),
      "@shared": path.resolve(PROJECT_ROOT, "shared"),
      "@assets": path.resolve(PROJECT_ROOT, "attached_assets"),
    },
  },

  build: {
    outDir: path.resolve(PROJECT_ROOT, "dist/public"),
=======
// -----------------------------------------------------------------------------
// Vite Config
// -----------------------------------------------------------------------------
export default defineConfig(({ mode }) => ({
  /**
   * ⚠️ IMPORTANTE PARA RENDER
   * Render usa domínio próprio (*.onrender.com)
   * NÃO use subpath em produção
   */
  base: "/",

  root: path.resolve(__dirname, "client"),

  plugins: [
    react(),
    tailwindcss(),
    vitePluginManusRuntime(),
    vitePluginManusDebugCollector(),
  ],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client/src"),
      "@shared": path.resolve(__dirname, "shared"),
    },
  },

  envDir: __dirname,

  build: {
    outDir: path.resolve(__dirname, "dist/public"),
>>>>>>> 09f93b4d34a40c8ad4f5fa6d2f85ea2cefb3cbaf
    emptyOutDir: true,
  },

  server: {
    port: 3000,
    host: true,
<<<<<<< HEAD
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
=======
>>>>>>> 09f93b4d34a40c8ad4f5fa6d2f85ea2cefb3cbaf
  },
}));
