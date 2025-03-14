import express from "express";
import { adminAuth, userAuth } from "./middlewares/auth.js";
const app = express();

app.use("/admin", adminAuth);

app.get("/admin/getAllData", (req, res) => {
  res.send("Admin data fetched");
});

app.get("/user", userAuth, (req, res) => {
  res.send("User data fetched");
});

app.use("/", (err, req, res, next) => {
  if (err) {
    res.status(500).send("An unexpected error occured");
  }
});
app.listen(7777, () => {
  console.log("Server is successfully listening on port 7777");
});
