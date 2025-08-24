import mongoose from "mongoose";
import path from "path";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
    minlength: [3, "Username must be at least 3 characters long"],
    maxlength: [50, "Username can be at most 50 characters long"],
    trim: true,
    uppercase: true
  },
  fullname: {
    type: String,
    required: [true, "Fullname is required"],
    minlength: [1, "Fullname must be at least 1 character long"],
    maxlength: [50, "Fullname can be at most 50 characters long"],
    trim: true,
    lowercase: true
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Invalid email format"],
    trim: true,
    lowercase: true
  },
  phoneNum: {
    type: String,
    required: [true, "Telephone number is required"],
    match: [/^\+374\s\d{2}\s\d{3}-\d{3}$/, "Telephone must be in the format '+374 xx xxx-xxx'"]
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [3, "Password must be at least 3 characters long"],
    trim: true
  },
  status: {
    type: Number,
    enum: [1, 0],
    default: 0
  },
  onetimepass: {
    type: Number,
    default: null
  },
  basketCars: {
    type: [mongoose.Schema.Types.ObjectId],
    default: []
  }
},
{
  versionKey: false
});

export default mongoose.model("User", userSchema);