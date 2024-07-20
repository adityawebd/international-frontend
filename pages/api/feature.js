import { Feature } from "../../models/Feature";
import mongooseConnect from "../../lib/mongoose";


export default async function handle(req, res) {
  const {method} = req;
  await mongooseConnect();
  // await isAdminRequest(req,res);

  if (method === 'GET') {
    if (req.query?.id) {
      res.json(await Feature.findOne({_id:req.query.id}));
    } else {
      res.json(await Feature.find().sort({ _id: -1 }).limit(2));
    }
  }

}