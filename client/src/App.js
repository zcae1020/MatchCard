import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PlayerLogin from './Router/LoginRouter/PlayerLogin.js';
import SignUp from './Router/LoginRouter/SignUp';
import Channel from './Router/Channel';
import AuthLayout from './Router/AuthLayout.js';
import AdminLogin from './Router/LoginRouter/AdminLogin.js';
import io from 'socket.io-client';

const socket = io.connect('http://localhost:3001');

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PlayerLogin />} />
        <Route path="/AdminLogin" element={<AdminLogin />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route element={<AuthLayout />}>
          <Route path="/Channel" element={<Channel />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
