const express = require("express");
const router = express.Router();
const { makeOrder, getAllOrders } = require("../handlers/order");

router.post("/", makeOrder);
router.get("/", getAllOrders);

module.exports = router;
