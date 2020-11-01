const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const errorHandler = require("./handlers/error");
const bodyParser = require("body-parser");

const util = require("util");
const app = express();
const db = require("./config/db");

const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(morgan("dev"));

db.query('SELECT name FROM user WHERE user.password = "password"', function (
	error,
	result
) {
	if (error) throw error;
	console.log(result);
});

app.get("/register", (req, res) => {
	const { name, mobile, email, password } = req.query;
	db.query(
		`INSERT INTO user (name, mobile, email, password) VALUES ("${name}", ${mobile}, "${email}", "${password}")`,
		(err, resukt) => {
			if (err) {
				return res.send(err);
			}
		}
	);
});

app.use("/api/auth", require("./routes/auth"));
app.use((req, res, next) => {
	let err = new Error("Page Not Found");
	err.status = 404;
	next(err);
});

app.use(errorHandler);

app.listen(port, () => {
	console.log(`Server listening on port ${port}`);
});
