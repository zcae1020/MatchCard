import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Router/Login.js';
import SignUp from './Router/SignUp';
import Channel from './Router/Channel';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/" element={<Login />} />
        <Route path="/Channel" element={<Channel />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
