const mongoose = require("mongoose");

const connectDB = async () => {
  const remoteUri = process.env.MONGO_URL;
  const localUri = "mongodb://127.0.0.1:27017/alphadesks";

  try {
    if (remoteUri) {
      console.log("Attempting MongoDB connection...");
      const conn = await mongoose.connect(remoteUri, { serverSelectionTimeoutMS: 5000 });
      console.log(`MongoDB connected: ${conn.connection.host}`);
      return;
    }
  } catch (error) {
    console.warn(`Primary MongoDB connection failed (${error.message}). Trying local fallback at ${localUri}...`);
  }

  try {
    const conn = await mongoose.connect(localUri);
    console.log(`MongoDB connected (Local): ${conn.connection.host}`);
  } catch (localErr) {
    console.error(`Database connection error: ${localErr.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
