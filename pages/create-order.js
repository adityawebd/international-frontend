// pages/create-order.js
import axios from "axios";
import generateOrderNumber  from '../utils/generateOrderId';
// import { useSession } from 'next-auth/react';




function getTodayDate() {
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
    const day = now.getDate().toString().padStart(2, '0');
  
    return `${year}-${month}-${day}`;
  }

export async function getServerSideProps(req,res) {

    // const { data: session } = useSession();
  try {
    // Step 1: Generate the token
    // const authResponse = await axios.post(
    //   "https://apiv2.shiprocket.in/v1/external/auth/login",
    //   {
    //     email: process.env.email,
    //     password: process.env.password, // Replace with your Shiprocket password
    //   }
    // );

    // const token = authResponse.data.token;

    const orderId = generateOrderNumber();

    // console.log("orderId", orderId);
    const todayDate = getTodayDate();
    // console.log("todayDate", todayDate);


    console.log(req.body)

    // Step 2: Send a request to create an order with the token
    const orderData = {
      // Your order data here
      order_id: "224-4790",
      order_date: "2024-08-22 ",
      pickup_location: "INTERNATIONAL GIFT",
      channel_id: "",
      comment: "Reseller: M/s Goku",
      billing_customer_name: "Naruto",
      billing_last_name: "Uzumaki",
      billing_address: "House 221B, Leaf Village",
      billing_address_2: "Near Hokage House",
      billing_city: "New Delhi",
      billing_pincode: "110002",
      billing_state: "Delhi",
      billing_country: "India",
      billing_email: "naruto@uzumaki.com",
      billing_phone: "9876543210",
      shipping_is_billing: true,
      shipping_customer_name: "",
      shipping_last_name: "",
      shipping_address: "",
      shipping_address_2: "",
      shipping_city: "",
      shipping_pincode: "",
      shipping_country: "",
      shipping_state: "",
      shipping_email: "",
      shipping_phone: "",
      order_items: [
        {
          name: "Kunai",
          sku: "chakra123",
          units: 10,
          selling_price: "900",
          discount: "",
          tax: "",
          hsn: 441122,
        },
      ],
      payment_method: "COD",
      shipping_charges: 0,
      giftwrap_charges: 0,
      transaction_charges: 0,
      total_discount: 0,
      sub_total: 900,
      length: 10,
      breadth: 15,
      height: 20,
      weight: 2.5,
    };

    // const headers = {
    //   "Content-Type": "application/json",
    //   Authorization: `Bearer ${token}`,
    // };

    // const orderResponse = await axios.post(
    //   "https://apiv2.shiprocket.in/v1/external/orders/create/adhoc",
    //   orderData,
    //   {
    //     headers: headers,
    //   }
    // );

    // You can return the response data as props to the page
    return {
      props: {
        // order: orderResponse.data,
      },
    };
  } catch (error) {
    console.error(
      "Error:",
      error.response ? error.response.data : error.message
    );
    return {
      props: {
        error: error.message,
      },
    };
  }
}

export default function CreateOrderPage({ order, error }) {
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Order Created Successfully</h1>
      <pre>{JSON.stringify(order, null, 2)}</pre>
    </div>
  );
}
