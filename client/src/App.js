import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Loading from './Router/Loading';
import PlayerLogin from './Router/LoginRouter/PlayerLogin.js';
import SignUp from './Router/LoginRouter/SignUp';
import Channel from './Router/PlayerRouter/Channel';
import Room from './Router/PlayerRouter/Room';
import AuthLayout from './Router/AuthLayout.js';
import AdminLogin from './Router/LoginRouter/AdminLogin.js';
import SignUpSuccess from './Router/SignUpSuccess';
import io from 'socket.io-client';
import Admin from './Router/Admin';
import './css/Common.css';

function App() {
  const [connection, setConnection] = useState(false);
  const [uid, setUid] = useState('');
  const [channelid, setChannelid] = useState('');

  const socket = io.connect('http://localhost:3001');

  socket.on('connected', () => {
    setConnection(true);
    console.log('useEffect!!!');
  });

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            connection ? (
              <PlayerLogin socket={socket} setUid={setUid} />
            ) : (
              <Loading />
            )
          }
        />
        <Route
          path="/AdminLogin"
          element={<AdminLogin socket={socket} setUid={setUid} />}
        />
        <Route path="/SignUp" element={<SignUp socket={socket} />} />
        <Route path="/SignUpSuccess" element={<SignUpSuccess />} />
        <Route element={<AuthLayout />}>
          <Route
            path="/Channel"
            element={
              <Channel socket={socket} uid={uid} setChannelid={setChannelid} />
            }
          />
          <Route
            path="/Room"
            element={<Room socket={socket} channelid={channelid} />}
          />
          <Route path="/Admin" element={<Admin socket={socket} uid={uid} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
