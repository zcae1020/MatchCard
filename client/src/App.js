import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Loading from "./Router/Loading";
import PlayerLogin from "./Router/LoginRouter/PlayerLogin.js";
import PlayerSignUp from "./Router/LoginRouter/PlayerSignUp";
import AdminSignUp from "./Router/LoginRouter/AdminSignUp";
import Channel from "./Router/PlayerRouter/Channel";
import Room from "./Router/PlayerRouter/Room";
import AuthLayout from "./Router/AuthLayout.js";
import AdminLogin from "./Router/LoginRouter/AdminLogin.js";
import AdminSignUpSuccess from "./Router/LoginRouter/AdminSignUpSuccess";
import PlayerSignUpSuccess from "./Router/LoginRouter/PlayerSignUpSuccess";
import io from "socket.io-client";
import Admin from "./Router/Admin";
import GameBoard from "./Router/PlayerRouter/GameBoard";
import "./css/Common.css";

function App() {
  const [connection, setConnection] = useState(false);
  const [uid, setUid] = useState("");
  const [channelid, setChannelid] = useState("");
  const [roomid, setRoomid] = useState("");

  const socket = io("http://27.96.130.21:4000/", {
	cors: { origin: '*' }  
  });

  if (!connection) {
    socket.on("connected", () => {
      setConnection(true);
      console.log("useEffect!!!");
    });
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={connection ? <PlayerLogin socket={socket} setUid={setUid} /> : <Loading />} />
        <Route path="/AdminLogin" element={<AdminLogin socket={socket} setUid={setUid} />} />
        <Route path="/PlayerSignUp" element={<PlayerSignUp socket={socket} />} />
        <Route path="/AdminSignUp" element={<AdminSignUp socket={socket} />} />
        <Route path="/PlayerSignUpSuccess" element={<PlayerSignUpSuccess />} />
        <Route path="/AdminSignUpSuccess" element={<AdminSignUpSuccess />} />
        <Route element={<AuthLayout />}>
          <Route path="/Channel" element={<Channel socket={socket} uid={uid} setChannelid={setChannelid} />} />
          <Route path="/Room" element={<Room socket={socket} channelid={channelid} uid={uid} setRoomid={setRoomid} />} />
          <Route path="/Admin" element={<Admin socket={socket} uid={uid} />} />
        </Route>
        <Route path="/Game" element={<GameBoard socket={socket} uid={uid} channelid={channelid} roomid={roomid} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
