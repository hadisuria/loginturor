const express = require("express");
const cors = require("cors");
const mysql = require("mysql");

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const bcrypt = require("bcrypt");
const saltRounds = 10;

const app = express();

const db = mysql.createPool({
	host: "localhost",
	user: "root",
	password: "SQL.root.hadi6789",
	database: "loginsystem",
});

app.use(
	cors({
		origin: ["http://localhost:3000"],
		methods: ["GET", "POST"],
		credentials: true,
	})
);
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
	session({
		key: "userId",
		secret: "subscribe",
		resave: false,
		saveUninitialized: false,
		cookies: {
			expires: 60 * 60 * 24,
		},
	})
);

app.get("/", (req, res) => {
	res.send("Hello World");
});

app.post("/register", (req, res) => {
	const username = req.body.username;
	const password = req.body.password;

	bcrypt.hash(password, saltRounds, (err, hash) => {
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
				bcrypt.compare(password, result[0].password, (error, response) => {
					if (response) {
						req.session.user = result;
						console.log(req.session.user);
						res.send(result);
					} else {
						res.send({ message: "Wrong password!" });
					}
				});
			} else {
				// no result
				res.send({ message: "User doesn't exist!" });
			}
		}
	);
});

app.get("/login", (req, res) => {
	if (req.session.user) {
		res.send({ loggedIn: true, user: req.session.user });
	} else {
		res.send({ loggedIn: false });
	}
});

// PORT
const port = process.env.PORT || 3001;
app.listen(port, () => {
	console.log(`Listening to port ${port}`);
});
