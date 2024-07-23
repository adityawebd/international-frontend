import {Banner} from "../../models/Banner";
import mongooseConnect from "../../lib/mongoose";


export default async function handle(req, res) {
  const {method} = req;
  await mongooseConnect();
  // await isAdminRequest(req,res);

  if (method === 'GET') {
    if (req.query?.id) {
      res.json(await Banner.findOne({_id:req.query.id}));
    } else {
      res.json(await Banner.find().sort({ _id: -1 }).limit(3));
    }
  }

}