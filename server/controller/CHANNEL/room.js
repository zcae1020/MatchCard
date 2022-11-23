import express from 'express'
import {getDatabase} from 'firebase-admin/database';
import {CM} from "../../service/CHANNEL/channelManager.js";
import { UM } from '../../service/USER/userManager.js';
 
export const router = express.Router();
 
const db = getDatabase();
const channelRef = db.ref("channel");
 
export const room = (io, socket) => {
    const enterChannel = (uid, channelId) => {
        return new Promise((resolve, reject) => {
            UM.setChannelId(uid, channelId);
            const curChannelRef = channelRef.child(`${channelId}`);
            curChannelRef.child(`/rooms`).on('value', (snapshot) => {
                //console.log(sanpshot, snapshot.val());
                socket.emit("success room list", snapshot.val());
                resolve();
            }, (errorObject)=>{
                socket.emit("success room list", errorObject.name);
                reject();
            });
        })
    }

    const enterRoom = (uid, roomId) => {
        return new Promise((resolve, reject) => {
            UM.setroomId(uid, roomId);
            // 팀 배정 후, team 목록 return
        })
    }

    socket.on("room list", enterChannel);
    socket.on("enter room", enterRoom);
}