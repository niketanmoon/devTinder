import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  emailId: {
    type: String,
  },
  password: {
    type: String,
  },
  gender: {
    type: String,
  },
  age: {
    type: Number,
  },
});

export const User = mongoose.model("User", userSchema);
