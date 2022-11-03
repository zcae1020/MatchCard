import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Loading from "./Router/Loading";
import PlayerLogin from "./Router/LoginRouter/PlayerLogin.js";
import SignUp from "./Router/LoginRouter/SignUp";
import Channel from "./Router/Channel";
import AuthLayout from "./Router/AuthLayout.js";
import AdminLogin from "./Router/LoginRouter/AdminLogin.js";
import io from "socket.io-client";
import Admin from "./Router/Admin";

function App() {
	const [connection, setConnection] = useState(false);

	const socket = io.connect("http://localhost:3001");

	socket.on("connected", () => {
		setConnection(true);
		console.log("useEffect!!!");
	});

	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={connection ? <PlayerLogin socket={socket} /> : <Loading />} />
				<Route path="/AdminLogin" element={<AdminLogin socket={socket} />} />
				<Route path="/SignUp" element={<SignUp socket={socket} />} />
				<Route element={<AuthLayout />}>
					<Route path="/Channel" element={<Channel />} />
					<Route path="/Admin" element={<Admin socket={socket} />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
