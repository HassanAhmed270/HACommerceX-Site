import express from "express";
import nodemailer from "nodemailer";
import cors from "cors";
import { fileURLToPath } from "url";
import path from "path";
import fs from "fs";

// Load .env manually (no dotenv dep needed)
loadEnvFile();

const app = express();
const PORT = Number(process.env.PORT ?? 3000);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());

// CORS — allow Vite dev server and production origin
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:4173",
  process.env.FRONTEND_URL,
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // allow requests with no origin (e.g. curl, mobile) or matched origins
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(null, true); // permissive in dev; tighten in prod if needed
      }
    },
    credentials: true,
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Accept", "Authorization"],
  })
);

// ── Email endpoint ────────────────────────────────────────────────────────────
app.post("/api/sendEmail", async (req, res) => {
  const { name, email, subject, message } = req.body ?? {};

  if (
    !name?.trim() ||
    !email?.trim() ||
    !subject?.trim() ||
    !message?.trim()
  ) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    await sendEmail({
      name: name.trim(),
      email: email.trim(),
      subject: subject.trim(),
      message: message.trim(),
    });
    return res.status(200).json({ success: true });
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    console.error("[sendEmail] error:", msg);
    const userMsg = msg.startsWith("Email server is not configured")
      ? msg
      : "Unable to send email.";
    return res.status(500).json({ error: userMsg });
  }
});

// ── Static client (production) ────────────────────────────────────────────────
const clientDir = path.join(__dirname, "..", "dist");
const indexHtml = path.join(clientDir, "index.html");

if (fs.existsSync(indexHtml)) {
  app.use(express.static(clientDir));
  app.use((req, res) => {
    if (req.path.startsWith("/api/")) {
      return res.status(404).json({ error: "API route not found." });
    }
    res.sendFile(indexHtml);
  });
}

// ── Start ─────────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`✅  Express server running on http://localhost:${PORT}`);
});

// ── Helpers ───────────────────────────────────────────────────────────────────
function loadEnvFile() {
  const envPath = path.join(process.cwd(), ".env");
  if (!fs.existsSync(envPath)) return;
  const lines = fs.readFileSync(envPath, "utf8").split(/\r?\n/);
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const sep = trimmed.indexOf("=");
    if (sep === -1) continue;
    const key = trimmed.slice(0, sep).trim();
    const raw = trimmed.slice(sep + 1).trim();
    const value = raw.replace(/^(['"])(.*)\1$/, "$2");
    if (key && process.env[key] === undefined) process.env[key] = value;
  }
}

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
      "Email server is not configured. Add SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, and CONTACT_EMAIL to .env, then restart the server."
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
    <p><strong>Name:</strong> ${safeName}</p>
    <p><strong>Email:</strong> ${safeEmail}</p>
    <p><strong>Subject:</strong> ${safeSubject}</p>
    <p><strong>Message:</strong></p>
    <p>${safeMessage}</p>
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

  console.log("[sendEmail] sent:", info.messageId);
  return info;
}
