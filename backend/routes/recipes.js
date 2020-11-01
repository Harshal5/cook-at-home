const express = require("express");
const router = express.Router();
const { getAllRecipes, getARecipe } = require("../handlers/recipes")

router.get("/", getAllRecipes);
router.get("/:recipe_id", getARecipe);

module.exports = router;
