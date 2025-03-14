import express from "express";
import { adminAuth, userAuth } from "./middlewares/auth.js";
import "dotenv/config";
import { connectDB } from "./config/database.js";
import { User } from "./models/user.js";

const app = express();

app.post("/signup", async (req, res) => {
  const userObj = {
    firstName: "Niketan",
    lastName: "Moon",
    emailId: "niketanmoon@gmail.com",
    password: "Test@123",
    age: 31,
    gender: "Male",
  };
  try {
    // Creating new instance of user model
    const user = new User(userObj);

    await user.save();
    res.send("User added successfully");
  } catch (err) {
    res.status(400).send("Error saving user: " + err.message);
  }
});

connectDB()
  .then(() => {
    console.log("Database connected successfull");
    app.listen(7777, () => {
      console.log("Server is successfully listening on port 7777");
    });
  })
  .catch(() => {
    console.error("Database is not connected");
  });
