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
        let query = `SELECT user.name, reviews.rating, reviews.comment FROM reviews INNER JOIN user on (user.user_id = reviews.user_id) WHERE reviews.recipe_id= ${req.params.recipe_id}`;
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
        let query = `SELECT stock.ingredient_name, ingredients.quantity FROM ingredients INNER JOIN stock on (stock.ingredient_id = ingredients.ingredient_id) WHERE ingredients.recipe_id= ${req.params.recipe_id}`;
        db.query(query, (err, result) => {
            if(err) throw err;
            console.log(result);
            return res.status(200).json(result)
        });
    } catch (err) {
        next(err);
    }
}