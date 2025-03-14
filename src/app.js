import express from "express";
import { adminAuth, userAuth } from "./middlewares/auth.js";
import "dotenv/config";
import { connectDB } from "./config/database.js";
import { User } from "./models/user.js";

const app = express();

// middleware to converting body to json
app.use(express.json());

app.post("/signup", async (req, res) => {
  try {
    // Creating new instance of user model
    const user = new User(req.body);

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
