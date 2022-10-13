import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

const app = express();
app.use(cors());

const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  io.emit('connected');
  socket.on('player login', ({ accessToken, uid }) => {
    console.log(accessToken);
    console.log(uid);
  });
});

server.listen(3001, () => {
  console.log('SERVER IS RUNNING');
});
