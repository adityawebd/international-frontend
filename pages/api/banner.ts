'use server'

import { NextApiRequest, NextApiResponse } from "next"
import mongooseConnect from "../../lib/mongoose"
import Banner from "../../utils/models/cart"
// import { useSession, signIn, signOut } from "next-auth/react"



mongooseConnect()


console.log("mongoose Connect")
export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    // const {condition}=req.query;
    if (req.method == "GET") {
        try {
            

           
            const data = await Banner.find().sort({ _id: -1 }).limit(3)
            console.log("from cart", data);
            res.status(200).json(data)
        }
        catch (error) {
            console.log("the error is ",error);
            res.status(500).json({error: 'internal error'})
        }
    }
    else
    {
        res.status(405).json({error: 'Method not allowed'})
    }
}
