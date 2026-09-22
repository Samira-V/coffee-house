import mongoose from "mongoose";
console.log("MONGO_URI:", process.env.MONGO_URI);
const connectToDB = async () => {
  try {
    console.log("MONGO_URI exists:", !!process.env.MONGO_URI);

    if (mongoose.connection.readyState === 1) {
      return;
    }

    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected successfully");
  } catch (error) {
    console.log("MongoDB connection failed:", error);
    throw error;
  }
};

export default connectToDB;