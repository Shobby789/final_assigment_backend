const express = require("express");
const mongoose = require("mongoose");
const { createUser, loginUser } = require("../controllers/userController");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../data/key");
require("../models/db/userSchema");
const User = mongoose.model("Users");

// router.post("/createUser", createUser);
// router.post("/loginUser", loginUser);
router.post("/createUser", async (req, res) => {
  const { userName, address, phoneNumber, email, password, UserType } =
    req.body;
  const encryptedPassword = await bcrypt.hash(password, 12);
  // console.log("Data : ", req.body);
  try {
    await User.create({
      userName,
      address,
      phoneNumber,
      email,
      password: encryptedPassword,
      UserType,
    });
    res.json({ success: true });
  } catch (error) {
    res.json({ success: false });
  }
});

router.post("/loginUser", async (req, res) => {
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
      return res.send({ success: true, data: [user, token] });
    } else {
      return res.json({ error: "error" });
    }
  }
  res.json({ success: false, error: "InvAlid Password" });
});

module.exports = router;
