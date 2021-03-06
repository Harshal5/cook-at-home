const config = require("config");
const db = require("../config/db");

module.exports.getStock = async(req, res, next) =>{
    try {
        
        // Query to get the available stock 
        let query = `SELECT * FROM stock`;

        db.query(query, (err,result) => {
            if(err) throw err;
            console.log(result);
            return res.status(200).json(result);
        });
    } catch (err) {
        next(err);
    }
};

module.exports.addIngredient = async(req, res, next) => {
    try {
        let { ingredient_name, quantity_available, rate } = req.body;
        
        // Query to add  a new ingredient in the stock by the admin
        let query = `INSERT INTO stock (ingredient_name, quantity_available, rate) VALUES ("${ingredient_name}", ${quantity_available}, ${rate})`;
       
        db.query(query, (err, result) => {
            if(err) throw err;
            console.log(result);
            return res.status(200).json(result);
        });
    } catch (err) {
        next(err);
    }
}

module.exports.updateQuantity = async(req, res, next) => {
    try {
        let { ingredient_id } = req.params;
        let { addQuantity } = req.body;
       
        // Query to handle the quantity of a ingredient by the admin
        let query = `UPDATE stock SET quantity_available = quantity_available + ${addQuantity} WHERE ingredient_id = ${ingredient_id}`;
        
        db.query(query, (err, result) => {
            if(err) throw err;
            console.log(result);
            return res.status(200).json(result);
        });
    } catch (err) {
        next(err);
    }
}

module.exports.updateRate = async(req, res, next) => {
    try {
        let { ingredient_id } = req.params;
        let { rate } = req.body;
        
        // Query to update the rate of the ingredient by the admin
        let query = `UPDATE stock SET rate = ${rate} WHERE ingredient_id = ${ingredient_id}`;
        
        db.query(query, (err, result) => {
            if(err) throw err;
            console.log(result);
            return res.status(200).json(result);
        });
    } catch (err) {
        next(err);
    }
}
