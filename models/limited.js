import mongoose, {model, Schema, models} from "mongoose";

const LimetedSchema = new Schema({
    
    title: {type:String, required:true},
    description: String,
    price: {type: Number, required: true},
    images: [{type:String}],

}, {
  timestamps: true,
});

export const Limeted = models.Limeteds || model('Limeteds', LimetedSchema);