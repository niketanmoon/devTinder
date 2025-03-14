import express from "express";
const app = express();

app.use((req, res) => {
  res.send("Hello from the server!");
});

app.listen(7777, () => {
  console.log("Server is successfully listening on port 3000");
});
