const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
require("../models/db/userSchema");
const User = mongoose.model("Users");
require("../models/db/productSchema");
const Items = mongoose.model("Items");

router.get("/getUsers", async (req, res) => {
  try {
    const allUsers = await User.find({});
    res.send({ status: "ok", data: allUsers });
  } catch (error) {
    console.log(error.message);
    res.send("Server error");
  }
});

module.exports = router;
