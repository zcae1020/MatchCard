import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Router/Login.js';
import SignUp from './Router/SignUp';
import Channel from './Router/Channel';
import AuthLayout from './Router/AuthLayout.js';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route element={<AuthLayout />}>
          <Route path="/Channel" element={<Channel />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
