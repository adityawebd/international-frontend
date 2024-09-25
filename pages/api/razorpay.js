// pages/api/razorpay.js

import Razorpay from 'razorpay';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID, // Add your Key ID here
      key_secret: process.env.RAZORPAY_KEY_SECRET, // Add your Key Secret here
    });


    //console.log("body data is",req.body)

    // const price =req.body

    // //console.log("price is" , price)
    const payment_capture = 1;
    const amount = req.body; // amount in paise (500 paise = ₹5)
    const currency = 'INR';

    const options = {
      amount: amount * 100, // amount in the smallest currency unit
      currency,
      payment_capture,
    };

    try {
      const order = await razorpay.orders.create(options);
      res.status(200).json(order);
    } catch (error) {
      res.status(500).json({ error: 'Something went wrong' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
