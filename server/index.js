const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());

const server = http.createServer(app);

const channel = {
  channel1: {
    id: 'good1',
  },
  channel2: {
    id: 'good2',
  },
  channel3: {
    id: 'good3',
  },
};
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
    socket.emit('success');
  });
  socket.on('admin login', ({ accessToken, uid }) => {
    console.log(accessToken);
    console.log(uid);
    socket.emit('success');
  });
  socket.on('show me admin info', () => {
    console.log('good');
    socket.emit('admin channels info', { channel });
  });
  socket.on('admin signup', ({ accessToken, uid, group }) => {
    console.log(accessToken);
    console.log(uid);
    console.log(group);
    socket.emit('success');
  });
  socket.on('player signup', ({ accessToken, uid, group }) => {
    console.log(accessToken);
    console.log(uid);
    console.log(group);
    socket.emit('success');
  });
});

server.listen(3001, () => {
  console.log('SERVER IS RUNNING');
});
