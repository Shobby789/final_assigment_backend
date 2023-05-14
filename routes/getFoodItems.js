const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const app = express();
require("../models/db/productSchema");
const Items = mongoose.model("Items");
require("../models/db/categorySchema");
const CategoryItems = mongoose.model("Category");
app.use("/uploads", express.static("./uploads"));

router.get("/getFoodItems", async (req, res) => {
  try {
    const food_items = await Items.find({});
    // const food_images = await ItemImages.find({});
    // const categories = await CategoryItems.find({});
    res.send({ status: "ok", data: food_items });
  } catch (error) {
    res.send("Server error items could not fetched");
  }
});

module.exports = router;
