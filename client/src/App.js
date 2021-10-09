import React, { useState, useEffect } from "react";
import "./App.scss";
import Axios from "axios";

function App() {
	const [usernameReg, setUsernameReg] = useState("");
	const [passwordReg, setPasswordReg] = useState("");

	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const [loginStatus, setLoginStatus] = useState(false);

	const resetRegistrationInput = () => {
		setUsernameReg("");
		setPasswordReg("");
	};

	const resetLoginInput = () => {
		setUsername("");
		setPassword("");
	};

	Axios.defaults.withCredentials = true;
	const register = () => {
		Axios.post("http://localhost:3001/register", {
			username: usernameReg,
			password: passwordReg,
		}).then((response) => {
			console.log(response);
			resetRegistrationInput();
		});
	};

	const login = () => {
		Axios.post("http://localhost:3001/login", {
			username: username,
			password: password,
		}).then((response) => {
			// console.log(response.data);
			if (!response.data.auth) {
				setLoginStatus(false);
			} else {
				setLoginStatus(true);
				localStorage.setItem("token", response.data.token);
			}
			resetLoginInput();
		});
	};

	useEffect(() => {
		Axios.get("http://localhost:3001/login").then((response) => {
			if (response.data.loggedIn) {
				setLoginStatus(true);
			}
		});
	}, []);

	const userAuthenticated = () => {
		Axios.get("http://localhost:3001/isUserAuth", {
			headers: {
				"x-access-token": localStorage.getItem("token"),
			},
		}).then((response) => {
			console.log(response);
		});
	};

	return (
		<div className="App">
			<div className="registration">
				<h1>Registration</h1>
				<label>Username</label>
				<input
					type="text"
					value={usernameReg}
					onChange={(e) => {
						setUsernameReg(e.target.value);
					}}
				/>
				<label>Password</label>
				<input
					type="password"
					value={passwordReg}
					onChange={(e) => {
						setPasswordReg(e.target.value);
					}}
				/>
				<button onClick={register}>Register</button>
			</div>
			<div className="login">
				<h1>Login</h1>
				<input
					type="text"
					value={username}
					placeholder="Username..."
					onChange={(e) => setUsername(e.target.value)}
				/>
				<input
					type="password"
					value={password}
					placeholder="Password..."
					onChange={(e) => setPassword(e.target.value)}
				/>
				<button onClick={login}>Login</button>
			</div>

			{loginStatus && (
				<button onClick={userAuthenticated}>Check if Authenticated</button>
			)}
		</div>
	);
}

export default App;
