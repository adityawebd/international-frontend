import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  
  productid:
  {
    type:String,
    required:true
  },
  userid:
  {
    type:String,
    required:true
  },
}, {
  timestamps: true // Enable timestamps
});

// Create model


const Cart = mongoose.models.carts || mongoose.model("carts", cartSchema)

export default Cart;