import React, { useState } from "react";
import "./App.scss";
import Axios from "axios";

function App() {
	const [usernameReg, setUsernameReg] = useState("");
	const [passwordReg, setPasswordReg] = useState("");

	const register = () => {
		Axios.post("http://localhost:3001/register", {
			username: usernameReg,
			password: passwordReg,
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
					onChange={(e) => {
						setUsernameReg(e.target.value);
					}}
				/>
				<label>Password</label>
				<input
					type="text"
					onChange={(e) => {
						setPasswordReg(e.target.value);
					}}
				/>
				<button onClick={register}>Register</button>
			</div>
			<div className="login">
				<h1>Login</h1>
				<input type="text" placeholder="Username..." />
				<input type="text" placeholder="Password..." />
				<button>Register</button>
			</div>
		</div>
	);
}

export default App;
