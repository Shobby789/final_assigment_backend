const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const cors = require("cors");
const router = express.Router();
require("../models/db/productSchema");
const path = require("path");
const Item = mongoose.model("Items");
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
require("../models/db/productSchema");
const Product = mongoose.model("Items");

router.get(`/editItem/:_id`, async (req, res) => {
  // console.log("req:", req.params._id);
  let product = await Product.findOne({ _id: req.params._id });
  if (product) {
    res.send({ status: "ok", data: product });
  } else {
    res.send({ status: "item not found" });
  }
});

module.exports = router;
