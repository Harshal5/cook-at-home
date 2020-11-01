const express = require("express");
const router = express.Router();
const { getStock, addIngredient, updateQuantity, updateRate } = require("../handlers/ingredients")

router.get("/", getStock);
router.post("/add", addIngredient);
router.post("/update_quantity/:ingredient_id", updateQuantity);
router.post("/update_rate/:ingredient_id", updateRate);

module.exports = router;