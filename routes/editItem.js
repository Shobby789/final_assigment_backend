const express = require("express");
const router = express.Router();
const { editItem } = require("../controllers/productController");

router.get(`/editItem/:_id`, editItem);

module.exports = router;
