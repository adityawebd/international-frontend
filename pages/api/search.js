import mongooseConnect from '../../lib/mongoose'; // Function to connect to your database
import Product from '../../models/Product'; // Your Product model

export default async function handler(req, res) {
  const { query } = req.query; // Get the search query from the request

  if (!query) {
    return res.status(400).json({ message: 'Query is required' });
  }

  try {
    // Connect to the database
    await mongooseConnect();

    // Use MongoDB's text search to find matching products
    const products = await Product.find(
      { $text: { $search: query } }, // Text search
      { score: { $meta: 'textScore' } } // Include relevance score
    ).sort({ score: { $meta: 'textScore' } }); // Sort by relevance

    // Return all matching products
    return res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    return res.status(500).json({ message: 'Error fetching products', error });
  }
}




// for all 


// import mongoose from 'mongoose';
// import mongooseConnect from "../../lib/mongoose";

// mongooseConnect();

// export default async function handler(req, res) {
//   const { query } = req.query;

//   if (!query) {
//     res.status(400).json({ error: 'Query parameter is required' });
//     return;
//   }

//   try {
//     const db = mongoose.connection.db;

//     // Get a list of all collections in the database
//     const collections = await db.listCollections().toArray();

//     let results = [];

//     // Iterate over each collection
//     for (let collectionInfo of collections) {
//       const collection = db.collection(collectionInfo.name);

//       // Perform the search in the current collection
//       const collectionResults = await collection.find({
//         $or: [
//           { title: { $regex: query, $options: 'i' } },
//           { name: { $regex: query, $options: 'i' } },
          
//           { description: { $regex: query, $options: 'i' } }
//           // Add more fields as needed
//         ]
//       }).limit(10).toArray();

//       results = results.concat(collectionResults);
//     }

//     res.json(results);
//   } catch (error) {
//     console.error('Error searching collections:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// }
