const express = require("express");
const router = express.Router();
const { signin, signup, generateNewToken } = require("../handlers/auth");
const { loginRequired } = require("../middleware/auth");

router.post("/login", signin);
router.post("/register", signup);
router.get("/verifyToken", loginRequired, async (req, res, next) =>
	res.status(200).json("okay")
);
router.post("/refreshToken", generateNewToken);

module.exports = router;
