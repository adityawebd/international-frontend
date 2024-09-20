import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendOtpEmail = async (email, otp) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Your OTP for Password Reset',
    text: `Your OTP for password reset is ${otp}. It is valid for 5 minutes.`,
  };

  await transporter.sendMail(mailOptions);
};


export const orderConfermation =async(email , orderid)=>{
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Order Confirmation',
    text: `Your order has been confirmed with order ID: ${orderid}`,
  };

  await transporter.sendMail(mailOptions);
}




export const orderCancelation = async(email,orderid) =>{
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Order Cancelation',
    text: `Your order with order ID: ${orderid} has been cancelled`,
  };

  await transporter.sendMail(mailOptions);
} 