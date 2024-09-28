'use server'
import { NextApiRequest, NextApiResponse } from "next"
import mongooseConnect from "../../lib/mongoose"
import {Order} from '../../models/Order'

export default async function handle(req,res) {
  const {method} = req;


  mongooseConnect()

  
  
  console.log(req.query?.id);
  if (req.query?.id) {
    res.json(await Order.find({ _id: req.query.id }));
  } else {
    res.json(await Order.find().sort({ createdAt: -1 }));
  }
}