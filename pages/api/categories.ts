'use server';
import { NextApiRequest, NextApiResponse } from 'next';
import mongooseConnect from "../../lib/mongoose"; // Function to connect to MongoDB
import { Category } from "../../models/Category"; // Your Mongoose data model

// Connect to MongoDB
mongooseConnect();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      // Extract condition from query
      const { condition } = req.query;

      // Build query object
      const query = condition ? { _id: condition } : {};

      // Fetch data from MongoDB
      const categories = await Category.find(query);

      // Send response with consistent structure
      res.status(200).json({ categories });
    } catch (error) {
      console.error('Error fetching data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
