// models/Review.js
import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  product_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Lesson', // Assuming there's a Module model
    required: true,
  },
  product_name:{
    type: String,
    required: true,
  },
  averageRating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5,
  },
  reviews: [
    {
      user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user', // Assuming there's a User model
        required: true,
      },
      name:{
        type: String,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
        min: 0,
        max: 5,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
}, { timestamps: true });

export default mongoose.models.Review || mongoose.model('Review', reviewSchema);
