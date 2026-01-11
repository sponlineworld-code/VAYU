/**
 * Minimal Node/Express contact endpoint that sends a notification email via nodemailer.
 *
 * Install:
 *   npm install express nodemailer dotenv body-parser
 *
 * Environment variables (see .env.example):
 *   SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, NOTIFY_EMAIL
 *
 * Run:
 *   node server.js
 *
 * Note: For production use secure credentials, validation, logging and rate limits.
 */
const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());
app.use((req,res,next)=>{
  // CORS for local testing (adjust for production)
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader('Access-Control-Allow-Headers','Content-Type');
  res.setHeader('Access-Control-Allow-Methods','GET,POST,OPTIONS');
  if(req.method === 'OPTIONS') return res.sendStatus(200);
  next();
});

const {
  SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, NOTIFY_EMAIL, FROM_EMAIL
} = process.env;

if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS || !NOTIFY_EMAIL) {
  console.warn('Warning: Missing mail configuration env vars. Contact endpoint will fail until configured.');
}

const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: SMTP_PORT ? parseInt(SMTP_PORT,10) : 587,
  secure: SMTP_PORT == 465, // true for 465, false for other ports
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASS
  }
});

app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body || {};
  if(!name || !email || !message){
    return res.status(400).json({ error: 'Name, email and message are required.' });
  }

  const mailOptions = {
    from: FROM_EMAIL || `"VAYU Website" <${SMTP_USER}>`,
    to: NOTIFY_EMAIL,
    subject: `New contact request — VAYU: ${name}`,
    text: `Contact form submission\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    html: `<p><strong>Name:</strong> ${name}</p>
           <p><strong>Email:</strong> ${email}</p>
           <p><strong>Message:</strong></p>
           <p>${message.replace(/\n/g,'<br>')}</p>`
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ ok: true });
  } catch (err) {
    console.error('Mail send error:', err);
    res.status(500).json({ error: 'Failed to send email. Please try again later.' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=> console.log(`Contact server listening on ${PORT}`));