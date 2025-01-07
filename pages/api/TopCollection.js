import mongooseConnect from "../../lib/mongoose";
import TopCollection from "../../models/TopCollection";

export default async function handler(req, res) {
  await mongooseConnect();

  if (req.method === "GET") {
    try {
      const AllCollections = await TopCollection.find({});
      res.status(200).json({ success: true, data: AllCollections });
    } catch (error) {
      res.status(500).json({ success: false, error: "Failed to fetch AllCollections" });
    }
  } else {
    res.status(405).json({ success: false, error: "Method not allowed" });
  }
}
