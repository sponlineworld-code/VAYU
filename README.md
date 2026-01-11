# VAYU — Consulting website (static + contact handler)

Included:
- index.html — Home
- about.html — About Us
- services.html — Services
- contact.html — Contact Us (contact form posts to `/api/contact`)
- assets/css/style.css — Styles
- assets/js/main.js — Minimal interactivity & AJAX form submit
- server/server.js — Example Node/Express endpoint to send notification emails via SMTP
- server/.env.example — Example environment variables for SMTP

Design notes:
- Clean, premium corporate look with a blue theme and white background.
- Senior-led, professional tone throughout copy; avoids marketing hyperbole.
- WhatsApp link: opens chat with +351 962 797 632 via https://wa.me/351962797632

Deployment & email setup:
1. Static hosting:
   - The HTML/CSS/JS can be served from any static host (Netlify, Vercel, S3 + CloudFront, Apache/Nginx).
2. Contact form:
   Option A — Use the provided Node server:
     - Copy `server/.env.example` to `.env` and set SMTP credentials and NOTIFY_EMAIL.
     - Install dependencies: `npm install express nodemailer dotenv body-parser`
     - Run: `node server/server.js` (or run behind a process manager)
     - Configure your static host to proxy `/api/contact` to the Node server, or host the static files on the same server.
   Option B — Use a third-party form processor:
     - If you prefer not to run a server, replace the form action in contact.html with a Formspree/Netlify/other endpoint. Ensure the site owner receives email notifications.
3. WhatsApp:
   - The contact button uses https://wa.me/351962797632. Change the number in contact.html if needed.

Accessibility & security reminders:
- Validate inputs on the server side (the example does minimal checks).
- Use HTTPS in production.
- For high-volume production use: add rate limiting, CAPTCHA, logging, and stronger validation.

Customization:
- Update brand colors in `assets/css/style.css` :root variables.
- Replace the VAYU text mark with a graphical logo if available.
- Adjust copy in the HTML pages to suit local legal/regulatory requirements.

If you'd like, I can:
- Convert the project to a single-page React or Next.js site.
- Provide a PHP handler for email instead of Node.
- Add GDPR-compliant consent checkboxes and privacy text for forms.
