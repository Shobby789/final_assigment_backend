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

router.delete(`/deleteItem/:_id`, async (req, res) => {
  const { _id } = req.params;
  console.log(_id);
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
});

module.exports = router;
