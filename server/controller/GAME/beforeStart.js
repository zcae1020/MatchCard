import express from 'express'
import {getDatabase} from 'firebase-admin/database';
 
export const router = express.Router();
 
const db = getDatabase();
const userRef = db.ref('user');
 
export const beforeStart = (io, socket) => {
    const ready =  (uid) => {
        
    }

    socket.on("ready", ready);
}