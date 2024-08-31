import {model, models, Schema} from "mongoose";

const OrderSchema = new Schema({
  line_items:String,
  name:String,
  email:String,
  city:String,
  postalCode:String,
  address:String,
  country:String,
  paid:Boolean,
  buyer_name:String,
  images:String,
  order_id:Number,
  channel_order_id:Number,
  shipment_id:Number,
  status:String,
  quentity:String,
  cart:Object,
}, {
  timestamps: true,
});

export const Order = models?.Order || model('Order', OrderSchema);