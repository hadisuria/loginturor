const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql");
const app = express();

const db = mysql.createPool({
	host: "localhost",
	user: "root",
	password: "SQL.root.hadi6789",
	database: "loginsystem",
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
	res.send("Hello World");
});

app.post("/register", (req, res) => {
	const username = req.body.username;
	const password = req.body.password;

	db.query(
		"INSERT INTO users (username, password) VALUES (?,?)",
		[username, password],
		(err, result) => {
			console.log(err);
		}
	);
});

// PORT
const port = process.env.PORT || 3001;
app.listen(port, () => {
	console.log(`Listening to port ${port}`);
});
