import mongooseConnect from '../../lib/mongoose'; // Function to connect to your database
import Product from '../../models/Product'; // Your Product model

export default async function handler(req, res) {
  const { query } = req.query; // Get the search query from the request

  // Check if query parameter exists
  if (!query) {
    return res.status(400).json({ message: 'Query parameter is required' });
  }

  try {
    // Connect to the database
    await mongooseConnect();

    // Create a regex pattern for the fallback search
    const regex = new RegExp(query.split(/\s+/).join('|'), 'i'); // Match any term in the query

    // Step 1: Perform a text search on `title` and `tags`
    const textSearchResults = await Product.find(
      { $text: { $search: query } } // MongoDB text search
    )
      .sort({ score: { $meta: 'textScore' } }) // Sort by text relevance score
      .collation({ locale: 'en', strength: 2 }); // Case-insensitive matching

    // Step 2: If text search results are available, return them
    if (textSearchResults.length > 0) {
      return res.status(200).json(textSearchResults);
    }

    // Step 3: Fallback to regex search if no text search results
    const regexSearchResults = await Product.find({
      $or: [
        { title: { $regex: regex } }, // Regex search on `title`
        { tags: { $regex: regex } }, // Regex search on `tags`
      ],
    }).sort({ title: 1 }); // Sort fallback results alphabetically by title

    // Step 4: Combine text and regex search results (without duplicates)
    const combinedResults = [
      ...new Map(
        [...textSearchResults, ...regexSearchResults].map((item) => [item._id.toString(), item])
      ).values(),
    ];

    return res.status(200).json(combinedResults);
  } catch (error) {
    console.error('Error fetching products:', error);
    return res
      .status(500)
      .json({ message: 'Internal server error while fetching products', error });
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
