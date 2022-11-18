import React from "react";
import SignUp from "./SignUp";

function AdminSignUp({ socket }) {
  const userType = "admin";
  return (
    <div>
      <h1>Match Card Game - Admin</h1>
      <SignUp userType={userType} socket={socket} />
    </div>
  );
}

export default AdminSignUp;
