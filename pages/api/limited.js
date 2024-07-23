import { Limeted } from "../../models/limited";
import mongooseConnect from "../../lib/mongoose";


export default async function handle(req, res) {
  const {method} = req;
  await mongooseConnect();
  // await isAdminRequest(req,res);

  if (method === 'GET') {
    if (req.query?.id) {
      res.json(await Limeted.findOne({_id:req.query.id}));
    } else {
      res.json(await Limeted.find().sort({ _id: -1 }).limit(2));
    }
  }

  
}