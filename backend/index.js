const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const errorHandler = require("./handlers/error");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const util = require("util");
const app = express();

const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(morgan("dev"));

const config = {
	host: "localhost",
	user: "kanhaiya",
	password: "Mysql@123",
	database: "university",
};

const db = mysql.createPool(config);

app.get("/", (req, res) => {
	try {
		db.query("select * from classroom", (err, res) => {
            if (err) throw err;
            console.log(res);
        });
		res.send("Hello");
	} catch (err) {
		console.log(err);
	}
});

app.use((req, res, next) => {
	let err = new Error("Page Not Found");
	err.status = 404;
	next(err);
});

app.use(errorHandler);

app.listen(port, () => {
	console.log(`Server listening on port ${port}`);
});
