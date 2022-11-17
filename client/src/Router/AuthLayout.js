import React from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import styles from "../css/ChannelAndRoom.module.css";

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
      <a onClick={logout} className={styles.logout}>
        로그아웃
      </a>
      <Outlet />
    </div>
  );
}

export default AuthLayout;
