import React from "react";
import Login from "./Login";

function PlayerLogin({ socket, setUid }) {
  const userType = "player";
  return (
    <div>
      <h1>Match Card Game</h1>
      <Login userType={userType} socket={socket} setUid={setUid} />
    </div>
  );
}

export default PlayerLogin;
