const express = require("express");
const router = express.Router();
const { deleteItem } = require("../controllers/productController");

router.post(`/deleteItem/:_id`, deleteItem);

module.exports = router;
