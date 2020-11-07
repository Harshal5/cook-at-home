const jwt = require("jsonwebtoken");
const config = require("config");
const db = require("../config/db");

module.exports.signin = async (req, res, next) => {
	try {
		let { email, password } = req.body;

		// Query of Signing in
		let query = `SELECT * FROM user WHERE email="${email}" and password="${password}"`;

		db.query(query, (err, result) => {
			if (err) throw err;
			let user = result[0];
			console.log(user);
			if (!user) {
				return next({
					status: 401,
					message: "Invalid username/password",
				});
			}
			let { user_id, name, mobile, email } = user;
			let id = user_id;
			let accessToken = jwt.sign(
				{
					id,
					email,
				},
				config.get("accessTokenSecret"),
				{
					expiresIn: "1m",
				}
			);
			let refreshToken = jwt.sign(
				{
					id,
					email,
				},
				config.get("refreshTokenSecret"),
				{
					expiresIn: "7d",
				}
			);
			return res.status(200).json({
				id,
				email,
				mobile,
				name,
				accessToken,
				refreshToken,
			});
		});
		// let { id, username, fullname, userData } = user;
		// if (userType === 'admin') {
		//   if (user.clubs.length === 0) {
		//     return next({
		//       status: 400,
		//       message: 'Unauthorized access'
		//     });
		//   }
		// }
	} catch (err) {
		next(err);
	}
};

module.exports.signup = async (req, res, next) => {
	try {
		let { firstName, lastName, mobile, email, password } = req.body;
		let name = firstName + " " + lastName;

		// Query of Registering a new User
		let query = `INSERT INTO user(name, mobile, email, password) VALUES ("${name}", ${mobile}, "${email}", "${password}")`;

		db.query(query, (err, result) => {
			if (err) throw err;
			let id = result.insertId;
			let accessToken = jwt.sign(
				{
					id,
					email,
				},
				config.get("accessTokenSecret"),
				{
					expiresIn: "2h",
				}
			);
			let refreshToken = jwt.sign(
				{
					id,
					email,
				},
				config.get("refreshTokenSecret"),
				{
					expiresIn: "7d",
				}
			);
			return res.status(200).json({
				id,
				email,
				name,
				accessToken,
				refreshToken,
			});
		});
	} catch (err) {
		if (err.code === 11000) {
			err.message = "Username is taken";
		}
		return next({
			status: 400,
			message: err.message,
		});
	}
};

module.exports.generateNewToken = async (req, res, next) => {
	try {
		console.log(req.body);
		const { refreshToken } = req.body;
		console.log(refreshToken);
		if (!refreshToken) {
			return res
				.status(403)
				.json({ error: "Access denied,token missing!" });
		} else {
			const { iat, exp, ...payload } = jwt.verify(
				refreshToken,
				config.get("refreshTokenSecret")
			);
			console.log(payload);
			const accessToken = jwt.sign(
				payload,
				config.get("accessTokenSecret"),
				{
					expiresIn: "1d",
				}
			);
			return res.status(200).json({ accessToken });
		}
	} catch (err) {
		console.error(err);
		return next(err);
	}
};

module.exports.verifyUser = async (req, res, next) => {
	
	// Query to verfiy the JWT auuthorisation of the user
	let query = `SELECT * FROM user WHERE user_id="${req.params.userId}"`;
	db.query(query, (err, result) => {
		if (err) throw err;
		let user = result[0];
		console.log(user);
		if (!user) {
			res.status(400).json({ error: "No user found" });
		} else {
			res.userData = user.userData;
		}
	});
	next();
};
