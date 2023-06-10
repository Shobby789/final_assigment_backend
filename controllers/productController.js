const express = require("express");
const mongoose = require("mongoose");
const app = express();
const multer = require("multer");
const cors = require("cors");
const router = express.Router();
require("../models/db/productSchema");
const Item = mongoose.model("Items");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
require("../models/db/productSchema");
const Product = mongoose.model("Items");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    return cb(null, Date.now() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedFileTypes = ["image/jpeg", "image/jpg", "image/png"];
  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const upload = multer({ storage, fileFilter });

// add item
module.exports.addItem = async (req, resp) => {};

// delete item
module.exports.deleteItem = async (req, res) => {
  const { _id } = req.params;
  // console.log(_id);
  try {
    const deletedItem = await Item.findByIdAndDelete(req.params._id);
    if (!deletedItem) {
      res.send({ status: "item not found", data: "error" });
    } else {
      res.send({ status: "ok! item deleted" });
    }
  } catch (error) {
    console.log(error);
  }
};

// editItem
module.exports.editItem = async (res, req) => {
  // console.log("req:", req.params._id);
  let product = await Product.findOne({ _id: req.params._id });
  if (product) {
    res.send({ status: "ok", data: product });
  } else {
    res.send({ status: "item not found" });
  }
};

// Get All Items
module.exports.getAllItems = async (res, req) => {
  try {
    const food_items = await Item.find({});
    // const food_images = await ItemImages.find({});
    // const categories = await CategoryItems.find({});
    res.send({ status: "ok", data: food_items });
  } catch (error) {
    res.send("Server error items could not fetched");
  }
};
