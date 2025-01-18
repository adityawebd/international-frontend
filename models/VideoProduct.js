// models/VideoProduct.js
import mongoose from 'mongoose';

const VideoProductSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/.test(v);
      },
      message: 'Invalid URL format.',
    },
  },
});

export default mongoose.models.VideoProduct || mongoose.model('VideoProduct', VideoProductSchema);
