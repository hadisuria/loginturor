const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql");

const bcryp = require("bcrypt");
const saltRounds = 10;

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

	bcryp.hash(password, saltRounds, (err, hash) => {
		if (err) {
			console.log(err);
			res.send({ error: err });
		} else {
			db.query(
				"INSERT INTO users (username, password) VALUES (?,?)",
				[username, hash],
				(err, result) => {
					if (err) res.send(err);

					// send status
					res.send(result.status);
				}
			);
		}
	});
});

app.post("/login", (req, res) => {
	const username = req.body.username;
	const password = req.body.password;

	db.query(
		"SELECT * FROM users where username = ?",
		[username],
		(err, result) => {
			if (err) {
				console.log(err);
				res.send(err);
			}

			// send status
			if (result.length > 0) {
				bycryp.compare(password, result[0].password, (error, response) => {
					if (response) {
						res.send(result);
					} else {
						res.send({ message: "User doesn't exist!" });
					}
				});
			}
		}
	);
});

// PORT
const port = process.env.PORT || 3001;
app.listen(port, () => {
	console.log(`Listening to port ${port}`);
});
