'use server'
import { NextApiRequest, NextApiResponse } from 'next';
import mongooseConnect from "../../lib/mongoose";// Function to connect to MongoDB
import Product from "../../models/Product"; // Your Mongoose data model

// Connect to MongoDB
mongooseConnect();

console.log("Connecting to MongoDB")

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const {condition}=req.query;
  if (req.method === 'GET') {
    try {
      // Fetch data from MongoDB using Mongoose model
      
      const query = {_id: condition };
      const data = await Product.find(query); // Assuming Product is your Mongoose model

      console.log("data in the cart bitch", data);
      res.status(200).json(data)
        
      res.status(200).json(data);
    } catch (error) {
      console.error('Error fetching data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}