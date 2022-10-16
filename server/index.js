const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());

const server = http.createServer(app);

const channels = [
  {
    name: 'channel_1',
    id: 'id_1',
  },
  {
    name: 'channel_2',
    id: 'id_2',
  },
];
// const channels = { name: 'name_1', id: 'id_1' };

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  socket.emit('connected');
  socket.on('player login', ({ accessToken, uid }) => {
    console.log(accessToken);
    console.log(uid);
  });
  socket.on('admin login', ({ accessToken, uid }) => {
    console.log(accessToken);
    console.log(uid);
  });
  socket.on('show me admin info', () => {
    console.log('is good?');
    channels.map((channel) => {
      console.log('not bad');
      socket.emit('admin info', { channel });
      console.log(channel);
    });
  });
  socket.on('admin signup', ({ accessToken, uid, group }) => {
    console.log(accessToken);
    console.log(uid);
    console.log(group);
  });
  socket.on('player signup', ({ accessToken, uid, group }) => {
    console.log(accessToken);
    console.log(uid);
    console.log(group);
  });
});

server.listen(3001, () => {
  console.log('SERVER IS RUNNING');
});
