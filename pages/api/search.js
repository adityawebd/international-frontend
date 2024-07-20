import Product from '../../models/Product'
import mongooseConnect from "../../lib/mongoose"


mongooseConnect()

export default async function handler(req, res) {
  const { query } = req.query;


  if (!query) {
    res.status(400).json({ error: 'Query parameter is required' });
    return;
  }

  var courses = await Product 
    .find({ title: { $regex: query, $options: 'i' }  }) // Adjust the field name based on your collection
    .limit(10)
 
   

    console.log("serching")

  res.json(courses);
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
