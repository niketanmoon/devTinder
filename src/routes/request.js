import express from "express";
import { userAuth } from "../middlewares/auth.js";

export const requestRouter = express.Router();

requestRouter.post("/connectionRequest", userAuth, async (req, res) => {
  try {
    res.send(req.user);
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
});
