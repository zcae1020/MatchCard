import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Loading from './Router/Loading';
import PlayerLogin from './Router/LoginRouter/PlayerLogin.js';
import SignUp from './Router/LoginRouter/SignUp';
import Channel from './Router/Channel';
import AuthLayout from './Router/AuthLayout.js';
import AdminLogin from './Router/LoginRouter/AdminLogin.js';
import io from 'socket.io-client';

const socket = io.connect('http://localhost:3001');
function App() {
  const [connection, setConnection] = useState(false);

  useEffect(() => {
    socket.on('connected', () => {
      setConnection(true);
    });
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={connection ? <PlayerLogin socket={socket} /> : <Loading />}
        />
        <Route path="/AdminLogin" element={<AdminLogin socket={socket} />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route element={<AuthLayout />}>
          <Route path="/Channel" element={<Channel />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
