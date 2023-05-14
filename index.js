const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const main = require("./models/connection");
const router = express.Router();
const path = require("path");
app.use("/uploads", express.static("uploads"));
// router.use(express.static(__dirname + "./public/"));
main();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
require("dotenv").config();

app.get("/", (req, res) => {
  res.send("Server started at port 4000");
});

app.use("/api", require("./routes/userRoute"));
app.use("/api", require("./routes/addItem"));
app.use("/api", require("./routes/deleteItem"));
app.use("/api", require("./routes/editItem"));
app.use("/api", require("./routes/getUsers"));
app.use("/api", require("./routes/getFoodItems"));
app.use("/api", require("./routes/getItemDetail"));
app.use("/api", require("./routes/uploadImage"));
app.use("/api", require("./routes/OrderData"));

app.listen(8000, () => {
  console.log("Server started at port 8000");
});
