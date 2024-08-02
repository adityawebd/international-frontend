'use server'

import { NextApiRequest, NextApiResponse } from "next"
import mongooseConnect from "../../lib/mongoose"
import Product from "../../models/Product";


mongooseConnect()



console.log("mongoose Connect")
export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const {condition}=req.query;
    if (req.method == "GET") {
        try {
            console.log("from module", condition);

            const query = { sku: condition };
            const data = await Product.find(query)
            console.log("from module", data);
            res.status(200).json(data)
        }
        catch (error) {
            res.status(500).json({error: 'internal error'})
        }
    }
    else
    {
        res.status(405).json({error: 'Method not allowed'})
    }
}
