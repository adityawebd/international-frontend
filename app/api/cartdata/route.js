
import { NextResponse, NextRequest } from "next/server";
import { connect } from "../../utils/config/dbConfig";
import Cart from "../../utils/models/cart";

connect();

export async function POST(request: NextRequest) {
  try {
    const { productid,userid } = await request.json();

   

    console.log( "from cartdata", productid,userid)

    

    const newCartDat = new Cart({

        productid,
        userid
      
     
    });

    const savedCartData = await newCartDat.save();

    return NextResponse.json({
      message: "addd to cart successfully",
      success: true,
      savedCartData,
    });
  } catch (error: any) {
    console.log(error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
