import express from 'express';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import EmailVerification from '../models/EmailVerification.js';

const router = express.Router();

const CODE_TTL_MS = 10 * 60 * 1000; // 10 minutes
const TOKEN_EXPIRES_IN = '30m';

const getJwtSecret = () => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('JWT_SECRET is required');
  }
  return secret;
};

const createTransporter = () => {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;
  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
    console.warn('SMTP env vars missing. Email sending will be skipped and logged to console.');
    return null;
  }
  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: Number(SMTP_PORT) === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });
};

const transporter = createTransporter();

const generateCode = () => Math.floor(100000 + Math.random() * 900000).toString();

router.post('/send-code', async (req, res) => {
  try {
    const { email } = req.body || {};
    if (!email) return res.status(400).json({ success: false, message: 'Email required' });

    const code = generateCode();
    const expiresAt = new Date(Date.now() + CODE_TTL_MS);

    await EmailVerification.findOneAndUpdate(
      { email },
      { code, expiresAt, createdAt: new Date() },
      { upsert: true, new: true }
    );

    if (transporter) {
      await transporter.sendMail({
        from: process.env.FROM_EMAIL || process.env.SMTP_USER,
        to: email,
        subject: 'Your verification code',
        text: `Your verification code is ${code}. It expires in 10 minutes.`,
      });
    } else {
      console.log(`[DEV] Verification code for ${email}: ${code}`);
    }

    res.json({ success: true, message: 'Code sent' });
  } catch (error) {
    console.error('send-code error:', error);
    res.status(500).json({ success: false, message: 'Failed to send code' });
  }
});

router.post('/verify-code', async (req, res) => {
  try {
    const { email, code } = req.body || {};
    if (!email || !code) return res.status(400).json({ success: false, message: 'Email and code required' });

    const record = await EmailVerification.findOne({ email });
    if (!record) return res.status(400).json({ success: false, message: 'No code found for this email' });
    if (record.expiresAt < new Date()) return res.status(400).json({ success: false, message: 'Code expired' });
    if (record.code !== code) return res.status(400).json({ success: false, message: 'Invalid code' });

    await EmailVerification.deleteOne({ email });

    const token = jwt.sign({ email, scope: 'email-verified' }, getJwtSecret(), { expiresIn: TOKEN_EXPIRES_IN });

    res.json({ success: true, token });
  } catch (error) {
    console.error('verify-code error:', error);
    res.status(500).json({ success: false, message: 'Failed to verify code' });
  }
});

export default router;
