import express from 'express'
import {getDatabase} from 'firebase-admin/database';
import {CM} from "../../service/CHANNEL/channelManager.js";
import { UM } from '../../service/USER/userManager.js';
 
export const router = express.Router();
 
const db = getDatabase();
const channelRef = db.ref("channel");
 
export const list = (io, socket) => {
    const getRoomList = (channelId) => {
        return new Promise((resolve, reject) => {
            const curChannelRef = channelRef.child(`${channelId}`);
            curChannelRef.child(`/rooms`).on('value', (snapshot) => {
                socket.emit("success room list", snapshot.val());
                resolve();
            }, (errorObject)=>{
                socket.emit("success room list", errorObject.name);
                reject();
            });
        })

        //curChannelRef.child(`/conn`).set(socket.id);
    }

    socket.on("room list", getRoomList);
}