const config = require("config");
const db = require("../config/db");


module.exports.addReview = async (req, res, next) => {
	try {
		let { recipe_id, user_id, rating, comment } = req.body;
		
		// Query to add a review for a recipe by a user
		let query = `INSERT INTO reviews(recipe_id, user_id, rating, comment) VALUES (${recipe_id}, ${user_id}, ${rating}, "${comment}")`;
		
		db.query(query, (err, result) => {
			if (err) throw err;
			console.log(result);
			return res.status(200).json(result);
		});
	} catch (err) {
		next(err);
	}
};