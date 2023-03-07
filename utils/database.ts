//mongoDBにコネクトと失敗した時の動作

import mongoose from "mongoose";

const connectDB =  async() => {
 try {
    await mongoose.connect(
      "mongodb+srv://restarts:korakuen@cluster0.zr32qgk.mongodb.net/appDataBase?retryWrites=true&w=majority"
    );
    console.log("Success Connected to MongoDB");
  } catch (error) {
    console.log("Failure Unconnected to MongoDB")
    throw new Error()
  }
};

export default connectDB;
