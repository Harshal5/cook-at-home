const config = require("config");
const db = require("../config/db");

module.exports.makeOrder = async (req, res, next) => {
	try {
		const { user_id, bill } = req.body;
		const query = `INSERT INTO orders(user_id, order_time, bill) VALUES(${user_id}, NOW(), ${bill})`;
		db.query(query, (err, result) => {
			if (err) throw err;
			console.log(result);
			return res.status(200).json(result);
		});
	} catch (err) {
		next(err);
	}
};

module.exports.getAllOrders = async (req, res, next) => {
	try {
		const query = `SELECT name, order_id, order_time, bill FROM orders o INNER JOIN user u ON o.user_id = u.user_id`;
		db.query(query, (err, result) => {
			if (err) throw err;
			console.log(result);
			return res.status(200).json(result);
		});
	} catch (err) {
		next(err);
	}
};
