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
  socket.on("player signup", ({ email, password, userName, group }) => {
    console.log(email);
    console.log(password);
    console.log(userName);
    console.log(group);
    socket.emit("success player signup");
  });
});

server.listen(3001, () => {
  console.log("SERVER IS RUNNING");
});
