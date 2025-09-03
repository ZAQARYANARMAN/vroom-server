import mongoose from "mongoose";

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URL)
    console.log('MongoDB connected');
  } catch (err) {
    console.log('MongoDB connection error:', err.message, "hello");
  }
};

connectDB()