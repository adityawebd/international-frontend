import mongooseConnect from "../../lib/mongoose";
import BestSell from "../../models/BestSell";

export default async function handler(req, res) {
  await mongooseConnect();

  if (req.method === "GET") {
    try {
      const AllCollections = await BestSell.find({});
      res.status(200).json({ success: true, data: AllCollections });
    } catch (error) {
      res.status(500).json({ success: false, error: "Failed to fetch AllCollections" });
    }
  }  else {
    res.status(405).json({ success: false, error: "Method not allowed" });
  }
}
