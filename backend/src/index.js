require('dotenv').config();
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();

// ========= CONFIG =========
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || 'http://localhost:5173';
const PORT = Number(process.env.PORT || 3333);

const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASS = process.env.SMTP_PASS; // Sua Senha de App de 16 dígitos
const CONTACT_RECEIVER = process.env.CONTACT_RECEIVER || SMTP_USER;

// ========= MIDDLEWARE =========
app.use(cors({ origin: FRONTEND_ORIGIN }));
app.use(express.json());

// ========= SMTP TRANSPORTER (Configurado para 2026) =========
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: Number(process.env.SMTP_PORT || 587),
  secure: false, // false para STARTTLS (porta 587)
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASS,
  },
  tls: {
    // Garante compatibilidade e evita erros de certificado em conexões seguras
    rejectUnauthorized: false,
    minVersion: 'TLSv1.2'
  },
  pool: true, // Reutiliza conexões para maior rapidez
  connectionTimeout: 10000,
});

// Verificação de conexão ao iniciar o servidor
transporter.verify((error) => {
  if (error) {
    console.error('❌ Erro na configuração do SMTP:', error.message);
  } else {
    console.log('✅ SMTP pronto para enviar e-mails');
  }
});

// ========= HELPERS =========
function escapeHtml(str = '') {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// ========= ROUTES =========
app.get('/health', (_, res) => res.json({ ok: true, timestamp: new Date() }));

app.post('/contact', async (req, res) => {
  const { name, email, subject, message } = req.body || {};

  // Validações básicas
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ success: false, message: 'Campos obrigatórios ausentes' });
  }

  if (!isValidEmail(email)) {
    return res.status(400).json({ success: false, message: 'E-mail inválido' });
  }

  if (!SMTP_USER || !SMTP_PASS) {
    console.error('❌ Credenciais SMTP não encontradas no arquivo .env');
    return res.status(500).json({ success: false, message: 'Configuração de servidor incompleta' });
  }

  try {
    const text = `
Nome: ${name}
Email: ${email}
Assunto: ${subject}

Mensagem:
${message}
    `.trim();

    const html = `
      <div style="font-family: sans-serif; color: #333; line-height: 1.6; max-width: 600px;">
        <h2 style="color: #007bff;">Novo contato pelo site</h2>
        <p><strong>Nome:</strong> ${escapeHtml(name)}</p>
        <p><strong>E-mail:</strong> ${escapeHtml(email)}</p>
        <p><strong>Assunto:</strong> ${escapeHtml(subject)}</p>
        <hr style="border: 0; border-top: 1px solid #eee;" />
        <div style="background: #f9f9f9; padding: 15px; border-radius: 5px;">
          ${escapeHtml(message).replace(/\n/g, '<br/>')}
        </div>
      </div>
    `;

    await transporter.sendMail({
      from: `"Site Contato" <${SMTP_USER}>`,
      to: CONTACT_RECEIVER,
      replyTo: email, // Permite responder direto ao usuário que preencheu o form
      subject: `[Contato Site] ${subject}`,
      text,
      html,
    });

    console.log(`📧 E-mail enviado com sucesso de: ${email}`);
    return res.status(200).json({ success: true });
    
  } catch (err) {
    console.error('❌ Erro ao enviar e-mail:', err);
    return res.status(500).json({ 
      success: false, 
      message: 'Falha ao enviar e-mail. Verifique o console do servidor.' 
    });
  }
});

// ========= START =========
app.listen(PORT, () => {
  console.log(`🚀 Backend iniciado em 2026: http://localhost:${PORT}`);
  console.log(`🌐 Origem permitida (CORS): ${FRONTEND_ORIGIN}`);
});
