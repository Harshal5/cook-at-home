const config = require("config");
const db = require("../config/db");

module.exports.getAllRecipes = async(req, res, next) =>{
    try {
        let query = `SELECT * FROM recipe`;
        db.query(query, (err,result) => {
            if(err) throw err;
            console.log(result);
            return res.status(200).json(result);
        });
    } catch (err) {
        next(err);
    }
};

module.exports.getARecipe = async(req, res, next) =>{
    try {
        let query = `SELECT * FROM recipe WHERE recipe_id = ${req.params.recipe_id}`;
        db.query(query, (err,result) => {
            if(err) throw err;
            console.log(result[0]);
            return res.status(200).json(result[0]);
        });
    } catch (err) {
        next(err);
    }
};

module.exports.getReview = async(req, res, next) => {
    try {
        let query = `SELECT u.name, r.rating, r.comment FROM reviews AS r INNER JOIN user AS u on (u.user_id = r.user_id) WHERE r.recipe_id= ${req.params.recipe_id}`;
        db.query(query, (err, result) => {
            if(err) throw err;
            console.log(result);
            return res.status(200).json(result)
        });
    } catch (err) {
        next(err);
    }
}

module.exports.getIngredients = async(req, res, next) => {
    try {
        let query = `SELECT s.ingredient_name, i.quantity FROM ingredients AS i INNER JOIN stock AS s on (s.ingredient_id = i.ingredient_id) WHERE i.recipe_id= ${req.params.recipe_id}`;
        db.query(query, (err, result) => {
            if(err) throw err;
            console.log(result);
            return res.status(200).json(result)
        });
    } catch (err) {
        next(err);
    }
}