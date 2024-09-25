import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please write your fullname"],
  },
  email: {
    type: String,
    required: [true, "please provide a valid email"],
    unique: true,
  },
  password: {
    type: String,
  },
  first_name: {
    type: String,
  },
  last_name: {
    type: String,
  },
  number: {
    type: String,
  }, 
  boughtcourses:{
    type: [String]
  },
  completcourses:
  {
    type: [String]
  },
  
},{timestamps:true});

const User = mongoose.models.users || mongoose.model("users", userSchema)

export default User