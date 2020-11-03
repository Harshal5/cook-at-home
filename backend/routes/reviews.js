const express = require("express");
const router = express.Router();
const { addReview } = require("../handlers/reviews");

router.post("/:recipe_id/add_review", addReview);

module.exports = router;