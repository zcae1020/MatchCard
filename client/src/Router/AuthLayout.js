import React from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

function AuthLayout() {
  const auth = getAuth();
  const navigate = useNavigate();

  onAuthStateChanged(auth, (user) => {
    if (!user) {
      navigate("/");
    }
  });

  const logout = () => {
    signOut(auth)
      .then(() => {
        console.log("logout success");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <button onClick={logout}>logout</button>
      <Outlet />
    </div>
  );
}

export default AuthLayout;
