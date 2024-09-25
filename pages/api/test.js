import dbConnect from '../../utils/dbConnect';
import Customer from '../../utils/models/customer'
import { orderCancelation, orderConfermation } from '../../utils/nodemailer';
import crypto from 'crypto';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email,id } = req.body;

  const user = await Customer.findOne({ email });

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  const otp = crypto.randomInt(100000, 999999).toString();

 

  await orderCancelation(email, id);

  res.status(200).json({ message: 'OTP sent to email' });
}
