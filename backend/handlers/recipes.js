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
        next(err)
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
        next(err)
    }
};

