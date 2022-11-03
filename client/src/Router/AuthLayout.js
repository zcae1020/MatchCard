import React from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";

function AuthLayout() {
	const auth = getAuth();
	const navigate = useNavigate();

	onAuthStateChanged(auth, (user) => {
		if (!user) {
			navigate("/");
		}
	});

	return (
		<div>
			<Outlet />
		</div>
	);
}

export default AuthLayout;
