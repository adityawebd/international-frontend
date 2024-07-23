// pages/api/categories.js
import { connectToDatabase } from '../../lib/mongodb'; // Make sure to set up MongoDB connection

export default async function handler(req, res) {
  const { db } = await connectToDatabase();

  const categories = await db.collection('categories').find({}).toArray();
  const products = await db.collection('products').find({}).toArray();

  res.status(200).json({ categories, products });
}
