// pages/api/coupons/index.js
import mongooseConnect from '../../lib/mongoose';
import Coupon from '../../models/coupon';

export default async function handler(req, res) {
  await mongooseConnect();

  if (req.method === 'GET') {
    // Fetch all coupons
    try {
      const coupons = await Coupon.find();
      res.status(200).json({coupons:coupons});
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch coupons' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
