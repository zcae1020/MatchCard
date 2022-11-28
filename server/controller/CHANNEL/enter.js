import express from 'express'
import {getDatabase} from 'firebase-admin/database';
import {CM} from "../../service/CHANNEL/channelManager.js";
import { TM } from '../../service/CHANNEL/teamManager.js';
import { UM } from '../../service/USER/userManager.js';
import { connection } from '../../inChannel.js';
 
export const router = express.Router();

const db = getDatabase();
const channelRef = db.ref("channel");

export let currentChannel, currentRoom, socketRoom, channelNamespace;

export const enter = (io, socket) => {
    const enterChannel = (channelId, uid) => {
        channelNamespace = io.of(`/${channelId}`);
        currentChannel = channelId;

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
      currentRoom = roomId;
      socketRoom = `${currentChannel}/${currentRoom}`;
      socket.join(socketRoom);
      UM.setRoomId(uid, roomId);
      // 팀 배정 후, team 목록 return, channel에 있는 socket에 broadcast,
      let teams = TM.putTeam(uid, channelId, roomId);
      //room으로 뿌리기
      channelNamespace.to(socketRoom).emit("success enter room", teams);
    });
  };

  const getUsernameByUid = async (uids) => {
    let ret = [];
    for(let uid in uids) {
      let user = await UM.getUserByUid(uid);
      ret.push(user.name);
    }
    
    io.to(socketRoom).emit("success enter room", teams);
  }

  const ready =  (uid) => {
    GAM.ready(uid).then((location) => {
      channelNamespace.to(socketRoom).emit("success ready", location);
      if(GAM.isAllReady()){
          GAM.start().then((gamemanager) => {
              channelNamespace.to(socketRoom).emit("start game", gamemanager);
          })
      }
    })
  }

  const changeTeam = (uid, teamId) => {
    
  }

  socket.on("ready", ready);
  socket.on("room list", enterChannel);
  socket.on("enter room", enterRoom);
  socket.on("get username by uid", getUsernameByUid);
};
