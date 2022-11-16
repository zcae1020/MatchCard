import React from "react";
import Login from "./Login";

function PlayerLogin({ socket, setUid }) {
  const userType = "player";
  return (
    <React.Fragment>
      <h1>Match Card Game</h1>
      <Login userType={userType} socket={socket} setUid={setUid} />
    </React.Fragment>
  );
}

export default PlayerLogin;
