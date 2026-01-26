import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

type ResponseData = {
  success: boolean;
  message?: string;
};

const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASS = process.env.SMTP_PASS;
const CONTACT_RECEIVER = process.env.CONTACT_RECEIVER ?? SMTP_USER;

function escapeHtml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  const { name, email, subject, message } = (req.body ?? {}) as {
    name?: string;
    email?: string;
    subject?: string;
    message?: string;
  };

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ success: false, message: 'Missing fields' });
  }

  if (!SMTP_USER || !SMTP_PASS) {
    console.error('SMTP credentials not set');
    return res
      .status(500)
      .json({ success: false, message: 'SMTP credentials not configured' });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, // STARTTLS
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
    });

    const plainText = `Nome: ${name}\nEmail: ${email}\n\nMensagem:\n${message}`;
    const htmlBody = `
      <h2>Novo contato pelo site</h2>
      <p><strong>Nome:</strong> ${escapeHtml(name)}</p>
      <p><strong>E-mail:</strong> ${escapeHtml(email)}</p>
      <p><strong>Assunto:</strong> ${escapeHtml(subject)}</p>
      <hr />
      <p>${escapeHtml(message).replace(/\n/g, '<br/>')}</p>
    `;

    await transporter.sendMail({
      from: `Site Contato <${SMTP_USER}>`,
      to: CONTACT_RECEIVER,
      replyTo: email,
      subject: `[Contato] ${subject}`,
      text: plainText,
      html: htmlBody,
    });

    return res.status(200).json({ success: true, message: 'Email sent' });
  } catch (error) {
    console.error('Email send error:', error);
    return res.status(500).json({ success: false, message: 'Email send failed' });
  }
}
