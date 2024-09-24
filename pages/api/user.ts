'use server'

import { NextApiRequest, NextApiResponse } from "next"
import mongooseConnect from "../../lib/mongoose"
import Customer from "../../utils/models/customer"


mongooseConnect()

//console.log("mongoose Connect")
export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    
    if (req.method == "GET") {
        try {
            const {condition}=req.query;
            //console.log("from teacher", condition);

            const query = { email: condition };
            const module = await Customer.findOne(query)
            //console.log("from lession", module);
            res.status(200).json(module)
        }
        catch (error) {
            res.status(500).json({error: 'internal error'})
        }
    }

    if (req.method === "PUT") {
        try {
            // //console.log(req.body)
            const { id } = req.body; // Extract `id` from the request query parameters
            const updateData = req.body; // Extract the update data from the request body

            // Update the user document with the provided data
            const result = await Customer.updateOne({ _id: id }, { $set: updateData });

            

            res.status(200).json({ message: 'Profile updated successfully', result });
        } catch (error) {
            console.error('Error updating profile:', error);
            res.status(500).json({ error: 'Internal server error' });
        }

    }
    else
    {
        res.status(405).json({error: 'Method not allowed'})
    }
}
