/**
 * root router
 */
import express from 'express'
import {login} from './controller/AUTH/auth.js'
import { crudChannel } from './controller/CHANNEL/crudChannel.js';
import { crudUser } from './controller/USER/crudUser.js';
import { createServer } from "http";
import { Server } from "socket.io";
import * as path from "path";
import { enter } from './controller/CHANNEL/enter.js';

const __dirname = path.resolve();
const port = process.env.PORT || 3001;

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
        allowedHeaders: ["my-custom-header"],
        credentials: true
    }
});

const onConnection = (socket) => {
    socket.emit("connected");
    console.log("new connection" + socket.id);
    socket.on("disconnect",()=>{
        console.log('disconnected');
        //UM.disconnectUser
    })
    socket.on("new_message", msg =>{
        console.log("new message ", msg);
    })
    socket.on('connect_error', msg => {
        console.log("error msg ", msg);
    })
    
    login(io,socket);
    crudChannel(io,socket);
    crudUser(io, socket);
    enter(io, socket);
}
  
io.on("connection", onConnection);

httpServer.listen(port, ()=>{
    console.log('start server');
});