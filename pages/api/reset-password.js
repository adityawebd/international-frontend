import dbConnect from '../../utils/dbConnect';
import Customer from '../../utils/models/customer'
import Otp from '../../models/Otp';
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email, otp, newPassword } = req.body;

  const otpRecord = await Otp.findOne({ email, otp });

  if (!otpRecord) {
    return res.status(400).json({ message: 'Invalid OTP' });
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  await Customer.updateOne({ email }, { password: hashedPassword });

  await Otp.deleteOne({ email, otp });

  res.status(200).json({ message: 'Password reset successful' });
}
