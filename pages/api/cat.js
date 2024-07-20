import {Category} from "../../models/Category";
import mongooseConnect from "../../lib/mongoose";


export default async function handle(req, res) {
  const {method} = req;
  await mongooseConnect();
  // await isAdminRequest(req,res);

  if (method === 'GET') {
    res.json(await Category.find().populate('parent'));
  }

 
}