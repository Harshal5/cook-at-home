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

app.use("/api/auth", require("./routes/auth"));
app.use("/api/recipes", require("./routes/recipes"));
app.use("/api/stocks", require("./routes/stock"));
app.use("/api/orders", require("./routes/order"));
app.use("/api/reviews", require("./routes/reviews"));

app.use((req, res, next) => {
	let err = new Error("Page Not Found");
	err.status = 404;
	next(err);
});

app.use(errorHandler);

app.listen(port, () => {
	console.log(`Server listening on port ${port}`);
});
