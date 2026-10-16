import nodemailer from "nodemailer";

function escapeHtml(v) {
  return v
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

async function sendEmail({ name, email, subject, message }) {
  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = Number(process.env.SMTP_PORT ?? "587");
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const contactEmail = process.env.CONTACT_EMAIL ?? "hacommercex@gmail.com";

  if (!smtpHost) {
    throw new Error(
      "Email server is not configured. Add SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, and CONTACT_EMAIL to Vercel environment variables."
    );
  }

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpPort === 465,
    auth: smtpUser && smtpPass ? { user: smtpUser, pass: smtpPass } : undefined,
  });

  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeSubject = escapeHtml(subject);
  const safeMessage = escapeHtml(message).replace(/\n/g, "<br />");

  const html = `
    <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
      <h2 style="color:#6366f1">New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${safeName}</p>
      <p><strong>Email:</strong> <a href="mailto:${safeEmail}">${safeEmail}</a></p>
      <p><strong>Subject:</strong> ${safeSubject}</p>
      <hr style="border:1px solid #e5e7eb"/>
      <p><strong>Message:</strong></p>
      <p style="white-space:pre-wrap">${safeMessage}</p>
    </div>
  `;
  const text = `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\n${message}`;

  const info = await transporter.sendMail({
    from: `"HACommerceX Website" <${smtpUser ?? contactEmail}>`,
    replyTo: email,
    to: contactEmail,
    subject: `[HACommerceX Contact] ${subject}`,
    text,
    html,
  });

  return info;
}

const PROD_ORIGIN = "https://hacommercex.vercel.app";
const LIMITS = { name: 100, email: 254, subject: 100, message: 5000 };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Browsers always send an Origin header on POST requests, including from our own site.
// Allowed: production, this project's Vercel preview URLs, and local development.
function isAllowedOrigin(origin) {
  if (!origin) return false;
  return (
    origin === PROD_ORIGIN ||
    /^https:\/\/hacommercex[a-z0-9-]*\.vercel\.app$/.test(origin) ||
    /^http:\/\/localhost:\d+$/.test(origin)
  );
}

export default async function handler(req, res) {
  const origin = req.headers.origin;
  if (isAllowedOrigin(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Vary", "Origin");
  }
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed." });
  }

  // A request from some other website is refused. (Requests with no Origin header,
  // such as scripts, are handled by the checks below.)
  if (origin && !isAllowedOrigin(origin)) {
    return res.status(403).json({ error: "Forbidden." });
  }

  const body = req.body ?? {};

  // Honeypot: real visitors never see or fill this field; bots often do.
  // Pretend it worked so the bot does not retry, but send nothing.
  if (typeof body.contact_website === "string" && body.contact_website.trim() !== "") {
    return res.status(200).json({ success: true });
  }

  const clean = (v) => (typeof v === "string" ? v.trim() : "");
  const name = clean(body.name);
  const email = clean(body.email);
  const subject = clean(body.subject).replace(/[\r\n]+/g, " ");
  const message = clean(body.message);

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: "All fields are required." });
  }
  if (
    name.length > LIMITS.name ||
    email.length > LIMITS.email ||
    subject.length > LIMITS.subject ||
    message.length > LIMITS.message
  ) {
    return res.status(400).json({
      error: "One of the fields is too long. Please shorten your message and try again.",
    });
  }
  if (!EMAIL_RE.test(email) || /[\r\n]/.test(email)) {
    return res.status(400).json({ error: "Please enter a valid email address." });
  }

  try {
    await sendEmail({ name, email, subject, message });
    return res.status(200).json({ success: true });
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    console.error("[sendEmail] error:", msg);
    const userMsg = msg.startsWith("Email server is not configured")
      ? msg
      : "Unable to send email. Please try again later.";
    return res.status(500).json({ error: userMsg });
  }
}
