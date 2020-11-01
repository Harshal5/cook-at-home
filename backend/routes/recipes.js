const express = require("express");
const router = express.Router();
const { getAllRecipes, getARecipe, getReview, getIngredients } = require("../handlers/recipes")

router.get("/", getAllRecipes);
router.get("/:recipe_id", getARecipe);
router.get("/:recipe_id/review", getReview);
router.get("/:recipe_id/ingredients", getIngredients);


module.exports = router;
