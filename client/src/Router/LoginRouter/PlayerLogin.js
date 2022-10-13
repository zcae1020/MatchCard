import React from 'react';
import Login from './Login';

function PlayerLogin({ socket }) {
  return (
    <React.Fragment>
      <h1>Match Card Game</h1>
      <Login socket={socket} />
    </React.Fragment>
  );
}

export default PlayerLogin;
