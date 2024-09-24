// import mongoose from "mongoose";

// export function mongooseConnect() {
//   if (mongoose.connection.readyState === 1) {
//     return mongoose.connection.asPromise();
//   } else {
//     const uri = process.env.MONGODB_URI || '';
//     return mongoose.connect(uri);
//   }
// }



// export async function mongooseConnect() {
//   if (mongoose.connection.readyState === 1) {
//     // Already connected
//     return mongoose.connection.asPromise();
//   } else {
//     const uri = process.env.MONGODB_URI;
//     if (!uri) {
//       throw new Error('MONGODB_URI is not defined in the environment variables');
//     }

//     try {
//       await mongoose.connect(uri, {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//       });
//       //console.log('Connected to MongoDB');
//       return mongoose.connection;
//     } catch (error) {
//       console.error('Error connecting to MongoDB:', error);
//       throw error;
//     }
//   }
// }


import mongoose from 'mongoose';

const mongooseConnect = async (): Promise<void> => {
  try {
    const dbURI =process.env.MONGODB_URI; ;

    

    await mongoose.connect(dbURI || 'mongodb+srv://avipurohit27:avinash27@cluster0.4jj9vnf.mongodb.net/gift');

    //console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1); // Exit process with failure
  }
};

export default mongooseConnect;
