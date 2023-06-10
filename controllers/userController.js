const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../data/key");
require("../models/db/userSchema");
const User = mongoose.model("Users");

module.exports.createUser = async (req, res) => {
  const { userName, address, phoneNumber, email, password } = req.body;
  const encryptedPassword = await bcrypt.hash(password, 12);
  console.log("Data : ", req.body);
  try {
    const checkUser = User.findOne({ email });
    if (!checkUser) {
      await User.create({
        userName,
        address,
        phoneNumber,
        email,
        password: encryptedPassword,
      });
      res.send({ success: true, data: data });
    } else {
      res.send({ success: false, data: "User Already exists" });
    }
  } catch (error) {
    res.send({ success: false, error: error });
  }
};

module.exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.json({ error: "User Does Not Exist" });
  }
  if (await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({ email: user.email }, SECRET_KEY, {
      expiresIn: "1h",
    });

    if (res.status(201)) {
      return res.send({ success: true, data: token });
    } else {
      return res.json({ error: "error" });
    }
  }
  res.json({ success: false, error: "InvAlid Password" });
};

module.exports.getAllUsers = async (res, req) => {
  try {
    const allUsers = await User.find({});
    res.send({ status: "ok", data: allUsers });
  } catch (error) {
    console.log(error.message);
    res.send("Server error");
  }
};
