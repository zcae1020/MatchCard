import express from 'express'
import {getDatabase} from 'firebase-admin/database';
import { connection } from '../../inChannel.js';
 
export const router = express.Router();

const db = getDatabase();
const channelRef = db.ref("channel");

export const game = (io, socket) => {
    const pickCard = (row, col) => {
            
    }

    socket.on("pick card", pickCard);
};
