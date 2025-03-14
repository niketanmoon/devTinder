import mongoose, { connect } from "mongoose";

const databaseName = "devTinder";
const url = process.env.MONGODB_URI + databaseName;

export const connectDB = async () => {
  await mongoose.connect(url);
};
