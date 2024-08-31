// pages/api/create-order.js
import axios from 'axios';
import generateOrderNumber from '../../utils/generateOrderId';
import mongooseConnect from "../../lib/mongoose"
import {Order} from '../../models/Order'
// import Product from "../../models/Product";


mongooseConnect()

function getTodayDate() {
  const now = new Date();
  const year = now.getFullYear();
  const month = (now.getMonth() + 1).toString().padStart(2, '0');
  const day = now.getDate().toString().padStart(2, '0');

  return `${year}-${month}-${day}`;
}

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      // Destructure the required fields from req.body
      const {
        images,
        Weight,
        address,
        amount,
        buyer_name,
        city,
        country,
        email,
        phone,
        postalCode,
        product_name,
        purpose,
        quentity,
        region,
        sku,
        title,
        cart
      } = req.body;


      // console.log(req.body)

      const order_items = cart.map((item,index) => ({
        name: item.title,
        sku: item.sku+[index],
        units: item.quantity,
        selling_price: item.discountedPrice,  // Use discountedPrice if available, otherwise price
        // discount: item.price - item.discountedPrice,  // Calculate discount
        tax: '',  // Set this according to your logic
        hsn: '',  // Set this according to your logic
      }));

      // console.log("weight is",Weight)
      // Step 1: Generate the token
      const authResponse = await axios.post('https://apiv2.shiprocket.in/v1/external/auth/login', {
        email: "rakeshtest@internationalgift.in",
        password: "Rakesh@123",
      });

      const token = authResponse.data.token;

      const orderId = generateOrderNumber();
      const todayDate = getTodayDate();

      // console.log(todayDate,orderId)

      // Step 2: Create order data using destructured values
      const orderData = {
        order_id: orderId,
        order_date: todayDate,
        pickup_location: 'INTERNATIONAL GIFT',
        channel_id: '',
        comment: purpose,
        billing_customer_name: buyer_name,
        billing_last_name: '',
        billing_address: address,
        billing_address_2: '',
        billing_city: city,
        billing_pincode: postalCode,
        billing_state: region,
        billing_country: country,
        billing_email: email,
        billing_phone: phone,
        shipping_is_billing: true,
        shipping_customer_name: '',
        shipping_last_name: '',
        shipping_address: '',
        shipping_address_2: '',
        shipping_city: '',
        shipping_pincode: '',
        shipping_country: '',
        shipping_state: '',
        shipping_email: '',
        shipping_phone: '',
        order_items: order_items,
        payment_method: 'COD',
        shipping_charges: 0,
        giftwrap_charges: 0,
        transaction_charges: 0,
        total_discount: 0,
        sub_total:  parseFloat(amount),
        length: 10,
        breadth: 15,
        height: 20,
        weight: 2, // Assuming weight is in "750Gm", convert it if needed
      };

      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      };

      const orderResponse = await axios.post(
        'https://apiv2.shiprocket.in/v1/external/orders/create/adhoc',
        orderData,
        {
          headers: headers,
        }
      );

      res.status(200).json({ order: orderResponse.data });
      try {
        // console.log("order",orderResponse.data )
        const {order_id,channel_order_id,shipment_id,status}=orderResponse.data ;
        // console.log("order_id is",order_id)
        // const query = {email: email };
        const line_items=title
        const data = await Order.create({
          line_items,buyer_name,email,city,postalCode,buyer_name,images,order_id,channel_order_id,shipment_id,status,quentity,cart,
          address,country,paid:false,})
        res.status(200).json(data)
    }
    catch (error) {
        res.status(500).json({error: 'internal error'})
        console.log(error)
    }
    } catch (error) {
      console.error('Error:', error.response ? error.response.data : error.message);
      res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
