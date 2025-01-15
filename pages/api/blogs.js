import mongooseConnect from "../../lib/mongoose";
import Blog from "../../models/blogs";
import { Import } from "lucide-react";
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/lib/auth";

export default async function handler(req, res) {
    const { method } = req;
    const { page = 1, limit = 10, search = '' } = req.query;
    await mongooseConnect();
    // const session = await getServerSession(req, res, authOptions);

    // console.log(session);
    
    // if (!session) {
    //   return res.status(401).json({ success: false, message: "Not authenticated" });
    // }

    switch (method) {
      case 'GET':
        if(req.query?.url){
          const blogs = await Blog.findOne({url:req.query.url})
          res.status(200).json({ success: true, data: blogs });
        }
        try {
          const blogs = await Blog.find({});
          res.status(200).json({ success: true, data: blogs });
        } catch (error) {
          res.status(400).json({ success: false });
        }
        break;
      
        
      default:
        res.status(400).json({ success: false });
        break;
    }
  }
  