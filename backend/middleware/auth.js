const jwt = require("jsonwebtoken");
const config = require("config")

exports.loginRequired = async (req, res, next) => {
	try {
		let token = req.headers.authorization.split(" ")[1];
		let decoded = await jwt.verify(token, config.get("accessTokenSecret"));
		if (!decoded)
			return next({ status: 401, message: "Please Log In First" });
		res.locals.userId = decoded.id;
		next();
	} catch (err) {
		return next({ status: 401, message: "Please Log In First" });
	}
};
