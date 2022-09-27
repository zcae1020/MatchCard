/**
 * root router
 */
import express from 'express'
import indexRouter from './routes/index.js'
import adminRouter from './routes/admin.js'
import {getAdminChannel, getPlayerChannel} from './controller/auth/login.js'
//import {getAdminChannel, getPlayerChannel} from './controller/auth/signup.js'
import cors from 'cors'
import { createServer } from "http";
import { Server } from "socket.io";

const httpServer = createServer();
const io = new Server(httpServer, {
    cors: {
        origin: "https://example.com",
        allowedHeaders: ["my-custom-header"],
        credentials: true
      }
});

const onConnection = (socket) => {
    socket.on("login:admin", getAdminChannel);
    socket.on("login:player", getPlayerChannel);
  
    socket.on("user:update-password", updatePassword);
}
  
io.on("connection", onConnection);

httpServer.listen(3000);

// export const app = express()

// app.use('/', signupRouter)
// app.use('/admin', adminRouter)
// app.use('/login', loginRouter)

// app.listen(5000)