const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors());

const server = http.createServer(app);

const channel = [
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
  "ten",
  "eleven",
  "twelve",
  "thirteen",
  "fourteen",
  "fifteen",
  "sixteen",
  "seventeen",
  "eighteen",
  "nineteen",
  "twenty",
];

const room = [
  {
    roomid: 1,
    state: true,
    userCnt: 6,
    maxTeam: 4,
  },
  {
    roomid: 2,
    state: false,
    userCnt: 5,
    maxTeam: 4,
  },
  {
    roomid: 3,
    state: true,
    userCnt: 8,
    maxTeam: 3,
  },
  {
    roomid: 4,
    state: false,
    userCnt: 8,
    maxTeam: 2,
  },
  {
    roomid: 5,
    state: true,
    userCnt: 8,
    maxTeam: 2,
  },
  {
    roomid: 6,
    state: true,
    userCnt: 8,
    maxTeam: 2,
  },
  {
    roomid: 7,
    state: false,
    userCnt: 8,
    maxTeam: 2,
  },
];

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  socket.emit("connected");
  socket.on("player login", ({ accessToken, uid }) => {
    console.log(accessToken);
    console.log(uid);
    socket.emit("success player login");
  });
  socket.on("admin login", ({ accessToken, uid }) => {
    console.log(accessToken);
    console.log(uid);
    socket.emit("success admin login");
  });
  socket.on("admin channel list", (uid) => {
    console.log("good");
    console.log(uid);
    socket.emit("admin channels info", channel);
  });
  socket.on("player channel list", (uid) => {
    console.log("good");
    console.log(uid);
    socket.emit("player channels info", channel);
  });
  socket.on("player room list", (channelid) => {
    console.log("good");
    console.log(channelid);
    socket.emit("player room info", room);
  });
  socket.on("player signup", ({ email, password, userName, group }) => {
    console.log(email);
    console.log(password);
    console.log(userName);
    console.log(group);
    socket.emit("success player signup");
  });
  socket.on("enter room", (roomid) => {
    console.log(roomid);
  });
});

server.listen(3001, () => {
  console.log("SERVER IS RUNNING");
});
