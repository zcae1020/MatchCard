import express from 'express'
import {getDatabase} from 'firebase-admin/database';
import {CM} from "../../service/CHANNEL/channelManager.js";
import { TM } from '../../service/CHANNEL/teamManager.js';
import { UM } from '../../service/USER/userManager.js';
import { connection } from '../../inChannel.js';
 
export const router = express.Router();

const db = getDatabase();
const channelRef = db.ref("channel");

export const enter = (io, socket) => {
    const enterChannel = (channelId, uid) => {
        let channelNamespace = io.of(`/${channelId}`);

        UM.setChannelId(uid, channelId);
        const curChannelRef = channelRef.child(`/${channelId}`);
        curChannelRef.child(`/rooms`).on('value', (snapshot) => {
            //console.log(sanpshot, snapshot.val());
            socket.emit("success room list", snapshot.val());
        }, (errorObject)=>{
            console.log(errorObject);
        });

        connection(channelNamespace);
    }

  const enterRoom = (roomId, channelId, uid) => {
    return new Promise((resolve, reject) => {
      console.log("enter room:", roomId, channelId, uid);
      const socketRoom = `${channelId}/${roomId}`;
      socket.join(socketRoom);
      UM.setRoomId(uid, roomId);
      // 팀 배정 후, team 목록 return, channel에 있는 socket에 broadcast,
      let teams = TM.putTeam(uid, channelId, roomId);
      //room으로 뿌리기
      io.to(socketRoom).emit("success enter room", teams);
    });
  };

  socket.on("room list", enterChannel);
  socket.on("enter room", enterRoom);
};
