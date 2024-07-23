import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({
  
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    // Regular expression for email validation
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  },

  password: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    // Regular expression for phone number validation
    match: /^[0-9]{10,}$/
  },
  address: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  postalCode: {
    type: String,
   
    
  },
  country: {
    type: String,
    required: true
  },
  region: {
    type: String
    // You can add validation specific to regions/states if needed
  }
}, {
  timestamps: true // Enable timestamps
});

// Create model


const Customer = mongoose.models.customers || mongoose.model("customers", customerSchema)

export default Customer