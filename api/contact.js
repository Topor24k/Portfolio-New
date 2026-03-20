import nodemailer from 'nodemailer'

const requiredEnv = ['SMTP_HOST', 'SMTP_PORT', 'SMTP_USER', 'SMTP_PASS', 'TO_EMAIL']
const maxFullNameLength = 120
const maxAmountLength = 40
const maxMessageLength = 3000
const rateLimitWindowMs = 10 * 60 * 1000
const maxRequestsPerWindow = 5
const submissionsByIp = new Map()

function getMissingEnv() {
  return requiredEnv.filter((key) => !process.env[key])
}

function getClientIp(req) {
  const forwarded = req.headers['x-forwarded-for']
  if (typeof forwarded === 'string' && forwarded.length > 0) {
    return forwarded.split(',')[0].trim()
  }

  return req.socket?.remoteAddress || req.connection?.remoteAddress || 'unknown'
}

function isRateLimited(ip) {
  const now = Date.now()
  const state = submissionsByIp.get(ip)

  if (!state || now - state.startedAt > rateLimitWindowMs) {
    submissionsByIp.set(ip, { count: 1, startedAt: now })
    return false
  }

  if (state.count >= maxRequestsPerWindow) {
    return true
  }

  state.count += 1
  return false
}

function normalizeText(value, maxLength) {
  if (typeof value !== 'string') return ''
  return value.replace(/\r/g, '').trim().slice(0, maxLength)
}

function escapeHtml(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function isValidEmail(value) {
  if (!value) return false
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

function setSecurityHeaders(res) {
  res.setHeader('X-Content-Type-Options', 'nosniff')
  res.setHeader('X-Frame-Options', 'DENY')
  res.setHeader('Referrer-Policy', 'no-referrer')
  res.setHeader('Cache-Control', 'no-store')
}

export default async function handler(req, res) {
  setSecurityHeaders(res)

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const clientIp = getClientIp(req)
  if (isRateLimited(clientIp)) {
    return res.status(429).json({ error: 'Too many requests. Please try again later.' })
  }

  const missingEnv = getMissingEnv()
  if (missingEnv.length > 0) {
    return res.status(500).json({
      error: `Missing environment variables: ${missingEnv.join(', ')}`,
    })
  }

  const {
    fullName = '',
    email = '',
    purpose = 'inquiry',
    amount = '',
    acknowledge = false,
    message = '',
    website = '',
    sentAt = 0,
  } = req.body || {}

  if (typeof website === 'string' && website.trim()) {
    return res.status(400).json({ error: 'Invalid submission.' })
  }

  const fullNameClean = normalizeText(fullName, maxFullNameLength)
  const emailClean = normalizeText(email, 320)
  const amountClean = normalizeText(amount, maxAmountLength)
  const messageClean = normalizeText(message, maxMessageLength)
  const purposeClean = ['donated', 'inquiry', 'other'].includes(purpose) ? purpose : 'other'

  if (!fullNameClean || !messageClean) {
    return res.status(400).json({ error: 'Full name and message are required.' })
  }

  if (emailClean && !isValidEmail(emailClean)) {
    return res.status(400).json({ error: 'Please provide a valid email address.' })
  }

  if (typeof sentAt === 'number' && sentAt > 0 && Date.now() - sentAt < 1200) {
    return res.status(400).json({ error: 'Invalid submission speed.' })
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: Number(process.env.SMTP_PORT) === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })

  const safePurposeMap = {
    donated: 'Donated and wants acknowledgement',
    inquiry: 'Inquiry',
    other: 'Other concern',
  }

  const subject = `[Portfolio Message] ${safePurposeMap[purposeClean]} - ${fullNameClean}`

  const textBody = [
    `Name: ${fullNameClean}`,
    `Sender Email: ${emailClean || 'Not provided'}`,
    `Purpose: ${safePurposeMap[purposeClean]}`,
    `Amount Donated: ${amountClean || 'N/A'}`,
    `Acknowledge Publicly: ${acknowledge ? 'Yes' : 'No'}`,
    '',
    'Message:',
    messageClean,
  ].join('\n')

  const htmlName = escapeHtml(fullNameClean)
  const htmlEmail = escapeHtml(emailClean || 'Not provided')
  const htmlPurpose = escapeHtml(safePurposeMap[purposeClean])
  const htmlAmount = escapeHtml(amountClean || 'N/A')
  const htmlMessage = escapeHtml(messageClean).replace(/\n/g, '<br/>')

  const htmlBody = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111;">
      <h2 style="margin-bottom: 12px;">New Message from Portfolio Donate Page</h2>
      <p><strong>Name:</strong> ${htmlName}</p>
      <p><strong>Sender Email:</strong> ${htmlEmail}</p>
      <p><strong>Purpose:</strong> ${htmlPurpose}</p>
      <p><strong>Amount Donated:</strong> ${htmlAmount}</p>
      <p><strong>Acknowledge Publicly:</strong> ${acknowledge ? 'Yes' : 'No'}</p>
      <hr style="margin: 16px 0;" />
      <p><strong>Message:</strong></p>
      <p style="white-space: pre-wrap;">${htmlMessage}</p>
    </div>
  `

  try {
    await transporter.sendMail({
      from: process.env.FROM_EMAIL || process.env.SMTP_USER,
      to: process.env.TO_EMAIL,
      replyTo: isValidEmail(emailClean) ? emailClean : undefined,
      subject,
      text: textBody,
      html: htmlBody,
    })

    return res.status(200).json({ ok: true })
  } catch (error) {
    console.error('contact send failed:', error?.message)
    return res.status(500).json({ error: 'Failed to send email. Please try again.' })
  }
}
