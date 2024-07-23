// pages/api/send-otp.js
import { connectToDatabase } from '../../lib/mongodb';
import nodemailer from 'nodemailer';
import crypto from 'crypto';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');
  
  const { email } = req.body;
  const { db } = await connectToDatabase();

  // Generate OTP
  const otp = crypto.randomInt(100000, 999999).toString();
  const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // OTP expires in 15 minutes

  // Save OTP to the database
  await db.collection('otps').insertOne({ email, otp, expiresAt });

  // Send OTP via email
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: email,
    subject: 'Your OTP Code',
    text: `Your OTP code is ${otp}. It will expire in 15 minutes.`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).json({ error: 'Failed to send OTP' });
    }
    res.status(200).json({ message: 'OTP sent successfully' });
  });
}
