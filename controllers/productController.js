const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const cors = require("cors");
const router = express.Router();
require("../models/db/productSchema");
const Item = mongoose.model("Items");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

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

router.post("/addItem", upload.single("itemImage"), async (req, res) => {
  const { itemName, itemDescription, itemCategory, itemPrice } = req.body;
  const itemImage = req.file.filename;

  console.log("body req: ", req.body);
  res.send({ status: "item added" });
  try {
    const oldItem = await Item.findOne({ itemName });
    if (oldItem) {
      return res.json({ error: "Item Exists" });
    }
    await Item.create({
      itemName,
      itemDescription,
      itemPrice,
      itemCategory,
      itemImage,
    });
    res.send({ status: "item added" });
  } catch (error) {
    console.log("Error", error);
    res.send({ status: "item could not be added" });
  }
});
