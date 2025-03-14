import express from "express";
const app = express();

app.get("/user", () => {
  res.send({ firstName: "Niketan", lastName: "Moon" });
});

app.use("/test", (req, res) => {
  res.send("Testing from the server");
});

app.listen(7777, () => {
  console.log("Server is successfully listening on port 3000");
});
