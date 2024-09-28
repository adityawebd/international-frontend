import dbConnect from "../../utils/dbConnect";
import { Order } from "../../models/Order";
import axios from "axios";
import { orderCancelation } from "../../utils/nodemailer";
export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "POST") {
    try {
      // Destructure the required fields from req.body
      const { id } = req.body;

      // const authResponse = await axios.post('https://apiv2.shiprocket.in/v1/external/auth/login', {
      //   email: "rakeshtest@internationalgift.in",
      //   password: "Rakesh@123",
      // });

      // const token = authResponse.data.token;

      // const headers = {
      //   'Content-Type': 'application/json',
      //   Authorization: `Bearer ${token}`,
      // };

      // const orderResponse = await axios.post(
      //   'https://apiv2.shiprocket.in/v1/external/orders/cancel',
      //   { id },
      //   {
      //     headers: headers,
      //   }
      // );

      // Extract the order_id from the response if needed
      // const { order_id } = orderResponse.data;
      // const { order_id } = id
              
      const orders = await Order.findOne({ _id: id });

      const Cart = orders.cart;
      const User = orders.buyer_name;
      const email = orders.email;

      // Update the order status to "canceled" in MongoDB where order_id matches
      const updatedOrder = await Order.updateOne(
        { _id: id },
        { $set: { status: "canceled" } }
      );

      if (!updatedOrder) {
        console.log(`No order found with order_id: ${id}`);
        return res.status(404).json({ error: "Order not found" });
      }

      console.log("Updated Order:", updatedOrder);

      // Send the final response with order data
      res.status(200).json({ order: "ordered canceled" });
      await orderCancelation(email, id, Cart, User);
    } catch (error) {
      console.error(
        "Error:",
        error.response ? error.response.data : error.message,
        error
      );
      res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
