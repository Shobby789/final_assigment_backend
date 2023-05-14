const express = require("express");
const mongoose = require("mongoose");
const { findOne } = require("../models/db/productSchema");
const router = express.Router();
require("../models/db/productSchema");
const Product = mongoose.model("Items");

router.get(`/getItemDetail/:_id`, async (req, res) => {
  // console.log("req:", req.params._id);
  let product = await Product.findOne({ _id: req.params._id });
  if (product) {
    res.send({ status: "ok", data: product });
  } else {
    res.send({ status: "item not found" });
  }
});

router.get("/getProduct/:id", async (req, res) => {
  const updateItem = await Product.findOne({ _id: req.params.id });
  if (updateItem) {
    res.send({ status: "ok", data: updateItem });
  } else {
    res.send({ status: "item not found" });
  }
});

router.put("/updateProduct/:id", async (req, res) => {
  const product = await Product.findOneAndUpdate(
    { _id: req.params.id },
    {
      $set: req.body,
    }
  );
  res.send({ status: "ok product updated", data: product });
});
module.exports = router;
