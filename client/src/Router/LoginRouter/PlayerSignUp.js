import React from "react";
import SignUp from "./SignUp";

function PlayerSignUp({ socket }) {
  const userType = "player";
  return (
    <div>
      <h1>Match Card Game</h1>
      <SignUp userType={userType} socket={socket} />
    </div>
  );
}

export default PlayerSignUp;
