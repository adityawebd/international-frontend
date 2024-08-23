'use server'
import { NextApiRequest, NextApiResponse } from "next"
import mongooseConnect from "../../lib/mongoose"
import {Order} from '../../models/Order'
// import Product from "../../models/Product";


mongooseConnect()



console.log("mongoose Connect")
export default async function handler(req, res) {

    const {email}=req.query;
    if (req.method == "GET") {
        try {
            const query = {email: email };
            const data = await Order.find(query).sort({createdAt:-1})
            
            res.status(200).json(data)
        }
        catch (error) {
            res.status(500).json({error: 'internal error'})
            console.log(error)
        }
    }
    else
    {
        res.status(405).json({error: 'Method not allowed'})
    }
}
