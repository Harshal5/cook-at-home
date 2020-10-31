const config = require('config');
const mysql = require("mysql");

const connectDB = mysql.createConnection(config.get("sqlconfig")) 

module.exports = connectDB;