/**
 * root router
 */
import express from 'express'
import {login} from './controller/AUTH/login.js'
import { crudChannel } from './controller/CHANNEL/crudChannel.js';
import cors from 'cors'
import { createServer } from "http";
import { Server } from "socket.io";
import * as path from "path";

const __dirname = path.resolve();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: "https://example.com",
        allowedHeaders: ["my-custom-header"],
        credentials: true
    }
});

app.get('/', function(req, res) {
    res.sendFile(
        path.join(__dirname + "/front/front.html")
    )
})

const onConnection = (socket) => {
    console.log("new connection");
    socket.on("disconnect",()=>{
        console.log('disconnected');
    })
    socket.on("new_message", msg =>{
        console.log("new message ", msg);
    })
    login(io,socket);
    crudChannel(io,socket);
    // socket.on("login:admin", getAdminChannel);
    // socket.on("login:player", getPlayerChannel);
  
    //socket.on("user:update-password", updatePassword);
}
  
io.on("connection", onConnection);

httpServer.listen(3000, ()=>{
    console.log('start server');
});

// export const app = express()

// app.use('/', signupRouter)
// app.use('/admin', adminRouter)
// app.use('/login', loginRouter)

// app.listen(5000)