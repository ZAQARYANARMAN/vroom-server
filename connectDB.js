import mongoose from "mongoose";

async function connectDB() {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/auto-shop')
    console.log('MongoDB connected');
  } catch (err) {
    console.log('MongoDB connection error:', err.message, "hello");
  }
};

connectDB()