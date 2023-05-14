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
app.use("/uploads", express.static("uploads"));
router.use(express.static(__dirname + "./public/"));

require("../models/db/itemImages");
const ItemImages = mongoose.model("Item_Images");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/uploads/");
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

// upload.single("image"),
router.post("/addItem", upload.single("itemImage"), async (req, res) => {
  const { itemName, itemDescription, itemCategory, itemPrice } = req.body;
  const { filename } = req.file;
  console.log("req.body: ", req.body);
  console.log("ItemImage: " + filename);

  try {
    const oldItem = await Item.findOne({ itemName });
    if (oldItem) {
      return res.json({ error: "Item Exists" });
    }
    await Item.create({
      itemName,
      itemDescription,
      itemCategory,
      itemPrice,
      itemImage: filename,
    });

    // await ItemImages.create({
    //   image: base64,
    // });

    res.send({ status: "item added" });
  } catch (error) {
    console.log("Error", error);
    res.send({ status: "item could not be added" });
  }
});

module.exports = router;
