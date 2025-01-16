// pages/api/videoProduct.js
import mongooseConnect from '../../lib/mongoose';
import VideoProduct from '../../models/VideoProduct';

export default async function handler(req, res) {
  await mongooseConnect();

  switch (req.method) {
    case 'GET':
      try {
        // Fetch all video products
        const videoProducts = await VideoProduct.find({});
        res.status(200).json({ success: true, data: videoProducts });
      } catch (error) {
        res.status(500).json({ success: false, message: error.message });
      }
      break;

      
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
