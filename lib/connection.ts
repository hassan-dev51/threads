import mongoose from "mongoose";

let isConnected: boolean = false;

//function to connect the DB
export async function connectToDB() {
  if (!process.env.MONGODB_URL) {
    console.log("Failed to connect");
  }
  if (isConnected) console.log("Already connected");

  try {
    await mongoose.connect(process.env.MONGODB_URL || "");
    isConnected = true;
    console.log("connected to db");
  } catch (error) {
    console.log(error);
  }
}
