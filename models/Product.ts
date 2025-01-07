import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {

    title: {
      type: String,
      required: true,
      trim: true
    },
    tags: {
      type: [String],
      trim: true
    },
    description: {
      type: String,
      required: true,
    
    },
    price: {
      type: Number,
      required: true,
      min: 0
    },
    discountedPrice: {
      type: Number,
      min: 0
    },
    images: {
      type: [String], // Array of image URLs
      validate: {
        validator: function(arr:any) {
          return arr.every((url: any) => typeof url === 'string');
        },
        message: 'Each image URL must be a string'
      }
    },
    category: {
      type: String,
      required: true,
      trim: true
    },
    properties: {
      color: {
        type: String,
        trim: true
      },
      weight: {
        type: Number, // Weight in grams
        min: 0
      },
      dimensions: {
        length: { type: Number, min: 0 },
        width: { type: Number, min: 0 },
        height: { type: Number, min: 0 }
      }
    },
    sku: {
      type: String,
      unique: true,
      trim: true,
      required: true
    },
    stockQuantity: {
      type: Number,
      min: 0,
      default: 0
    },
    dateAdded: {
      type: Date,
      default: Date.now
    }
 
},{timestamps:true});

productSchema.index({ title: 'text', tags: 'text' });

const Product =mongoose.models.products || mongoose.model("products", productSchema)

export default Product