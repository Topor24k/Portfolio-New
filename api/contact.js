import nodemailer from 'nodemailer'

const requiredEnv = ['SMTP_HOST', 'SMTP_PORT', 'SMTP_USER', 'SMTP_PASS']
const defaultRecipient = 'kayeencampana@gmail.com'

function getMissingEnv() {
  return requiredEnv.filter((key) => !process.env[key])
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
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
  } = req.body || {}

  if (!fullName.trim() || !message.trim()) {
    return res.status(400).json({ error: 'Full name and message are required.' })
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

  const subject = `[Portfolio Message] ${safePurposeMap[purpose] || 'New message'} - ${fullName}`

  const textBody = [
    `Name: ${fullName}`,
    `Sender Email: ${email || 'Not provided'}`,
    `Purpose: ${safePurposeMap[purpose] || purpose}`,
    `Amount Donated: ${amount || 'N/A'}`,
    `Acknowledge Publicly: ${acknowledge ? 'Yes' : 'No'}`,
    '',
    'Message:',
    message,
  ].join('\n')

  const htmlBody = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111;">
      <h2 style="margin-bottom: 12px;">New Message from Portfolio Donate Page</h2>
      <p><strong>Name:</strong> ${fullName}</p>
      <p><strong>Sender Email:</strong> ${email || 'Not provided'}</p>
      <p><strong>Purpose:</strong> ${safePurposeMap[purpose] || purpose}</p>
      <p><strong>Amount Donated:</strong> ${amount || 'N/A'}</p>
      <p><strong>Acknowledge Publicly:</strong> ${acknowledge ? 'Yes' : 'No'}</p>
      <hr style="margin: 16px 0;" />
      <p><strong>Message:</strong></p>
      <p style="white-space: pre-wrap;">${message}</p>
    </div>
  `

  try {
    await transporter.sendMail({
      from: process.env.FROM_EMAIL || process.env.SMTP_USER,
      to: process.env.TO_EMAIL || defaultRecipient,
      replyTo: email || undefined,
      subject,
      text: textBody,
      html: htmlBody,
    })

    return res.status(200).json({ ok: true })
  } catch {
    return res.status(500).json({ error: 'Failed to send email. Please try again.' })
  }
}
