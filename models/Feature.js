import mongoose, {model, Schema, models} from "mongoose";

const FeatureSchema = new Schema({
 
    title: {type:String, required:true},
    description: String,
    price: {type: Number, required: true},
    images: [{type:String}],

}, {
  timestamps: true,
});

export const Feature = models.Features || model('Features', FeatureSchema);