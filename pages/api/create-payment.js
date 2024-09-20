import axios from "axios";

// Replace with your Instamojo API key and Auth token
const API_KEY = "a32a6bed7c7075384302a6d3c6bd0b9a";
const AUTH_TOKEN = "2aec2dfbcb690ef745d92b6b166d1222";

export default async (req, res) => {
  if (req.method === "POST") {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      formData,
    } = req.body;

    console.log()
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.json(
        { success: false, message: "Payment verification failed" },
        { status: 400 }
      );
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};
