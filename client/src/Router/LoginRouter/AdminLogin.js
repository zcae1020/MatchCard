import React from "react";
import Login from "./Login";

function AdminLogin({ socket, setUid }) {
  const userType = "admin";
  return (
    <React.Fragment>
      <h1>Match Card Game - Admin</h1>
      <Login userType={userType} socket={socket} setUid={setUid} />
    </React.Fragment>
  );
}

export default AdminLogin;
