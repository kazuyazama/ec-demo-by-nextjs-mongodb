//mongoDBにコネクトと失敗した時の動作

import mongoose from "mongoose";

const connectDB =  async() => {
 try {
    await mongoose.connect(
      `${process.env.MONGO_DB_API_KEY}`
    );
    console.log("Success Connected to MongoDB");
  } catch (error) {
    console.log("Failure Unconnected to MongoDB")
    throw new Error()
  }
};

export default connectDB;
