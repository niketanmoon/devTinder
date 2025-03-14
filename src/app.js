import express from "express";
import "dotenv/config";
import { connectDB } from "./config/database.js";
import { User } from "./models/user.js";
import { validateSignupData } from "./utils/validation.js";
import bcrypt from "bcrypt";
import validator from "validator";

const app = express();

// middleware to converting body to json
app.use(express.json());

app.post("/signup", async (req, res) => {
  try {
    // Validation of data
    validateSignupData(req);

    const { firstName, lastName, emailId, password } = req.body;
    // Encrypt the password
    const passwordHash = await bcrypt.hash(password, 10);

    // Creating new instance of user model
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });
    await user.save();
    res.send("User added successfully");
  } catch (err) {
    res.status(400).send("Error saving user: " + err.message);
  }
});

app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    if (!validator.isEmail(emailId)) {
      throw new Error("Not a valid email");
    }

    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Email or password is not correct");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
      res.send("Login Successful!!!");
    } else {
      throw new Error("Email or password is not correct");
    }
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

// gets user by email
app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;
  try {
    const user = await User.findOne({ emailId: userEmail });
    if (!user) {
      res.status(404).send("User not found");
    } else {
      res.send(user);
    }
  } catch (err) {
    res.status(404).send("Something went wrong");
  }
});

// GET: /feed => gets all the users
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    if (users.length === 0) {
      res.send("No user in the database.");
    } else {
      res.send(users);
    }
  } catch (err) {
    res.status(400).send("Something went wrong: " + err.message);
  }
});

// PATCH: /user => Updates the user by id
app.patch("/user/:userId", async (req, res) => {
  const userId = req.params?.userId;
  const data = req.body;
  try {
    const ALLOWED_UPDATES = ["photoUrl", "about", "gender", "age", "skills"];
    const isUpdateAllowed = Object.keys(data).every((k) =>
      ALLOWED_UPDATES.includes(k)
    );
    if (!isUpdateAllowed) {
      throw new Error("Update not allowed");
    }
    const user = await User.findByIdAndUpdate(userId, data, {
      returnDocument: "after",
      runValidators: true,
    });
    console.log(user);
    res.send("User updated successfully");
  } catch (err) {
    res.status(400).send("Update Failed: " + err.message);
  }
});

// DELETE: /user => Deletes user by id
app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    await User.findByIdAndDelete(userId);
    res.send("User deleted successfully");
  } catch (err) {
    res.status(400).send("Something went wrong");
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
