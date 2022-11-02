import express from 'express'
import {getDatabase} from 'firebase-admin/database';
import {CM} from "../../service/CHANNEL/channelManager.js";
import { UM } from '../../service/USER/userManager.js';
 
export const router = express.Router();
 
const db = getDatabase();
 
export const list = (io, socket) => {
    const getRoomList = (channelId) => {
        
    }

    socket.on("room list", getRoomList);
}