import mongoose from "mongoose";

const MONGODB_URI = process.env.DATABASE_URL!;

let cached = (global as any).mongoose || { conn: null, promise: null };

export const connectDB = async () => {
  if (!MONGODB_URI)
    throw new Error(
      "Please define the mongo db database connection string inside the environment variables."
    );
  try {
    if (cached.conn) return cached.conn;

    if (!cached.promise) {
      cached.promise = mongoose
        .connect(MONGODB_URI, {
          dbName: "free-state-tennis",
        })
        .then((mongoose) => {
          console.log("MongoDB database connected successfully!");
          return mongoose;
        });

      cached.conn = await cached.promise;
      (global as any).mongoose = cached.conn;

      return cached.conn;
    }
  } catch (error) {
    console.error("MongoDB connection error:", error);
    cached.promise = null;
    console.error(error);
  }
};
