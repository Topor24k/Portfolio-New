# Portfolio React App

This project is ready for Vercel deployment, including a serverless email endpoint used by the Donate page "Message Me" form.

## Local development

1. Install dependencies:

```bash
npm install
```

2. Run development server:

```bash
npm run dev
```

3. Build production bundle:

```bash
npm run build
```

## Email setup for Donate "Message Me"

The form posts to `POST /api/contact` (Vercel serverless function).

1. Copy `.env.example` to `.env.local` for local testing.
2. Fill values with your SMTP details.

Required variables:

- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_USER`
- `SMTP_PASS`
- `TO_EMAIL`

Optional variable:

- `FROM_EMAIL` (defaults to `SMTP_USER`)

### Gmail example

- `SMTP_HOST=smtp.gmail.com`
- `SMTP_PORT=465`
- `SMTP_USER=yourgmail@gmail.com`
- `SMTP_PASS=your-gmail-app-password`
- `TO_EMAIL=yourgmail@gmail.com`

Use a Gmail App Password (not your normal account password).

Security notes:

- Never commit `.env.local` or real SMTP credentials.
- Keep `TO_EMAIL` configured in Vercel Environment Variables only.
- The API now has basic anti-spam protection (rate limit + honeypot + server-side validation).

## Deploy to Vercel

1. Import this project in Vercel.
2. Set the project root directory to `react-migrate`.
3. Add all environment variables from `.env.example` in Vercel Project Settings -> Environment Variables.
4. Deploy.

The included `vercel.json` handles SPA routing and keeps API routes working.
