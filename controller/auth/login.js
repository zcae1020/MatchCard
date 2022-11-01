/**
 * 로그인시 jwt 토큰 인식 및 인식확인 후 channel data
 */

import * as auth from 'firebase-admin/auth';
import {getDatabase} from 'firebase-admin/database';
import {CM} from "../../service/CHANNEL/channelManager.js";
import { decodeToken } from '../../middleware/index.js';

const db = getDatabase();
const userRef = db.ref('user');

export const login = (io, socket) => {
    const login1 = async (token, uid) => {
      auth.getAuth().verifyIdToken(token).then(()=>{
        userRef.child(`/${uid}`).on('value',(snapshot)=>{
          console.log(uid, snapshot.val());
          CM.getChannelIdInGroup(snapshot.val()["groupId"]).then(cs=>{
            socket.emit("login", cs);
          }).catch(e=>{
            console.log(e.msg);
          })
        })
      })
      .catch((error)=>{
          socket.emit("error", error);
      })
    }

    const login = (uid) => {
      userRef.child(`/${uid}`).on('value',(snapshot)=>{
        console.log(uid, snapshot.val());
        CM.getChannelIdInGroup(snapshot.val()["groupId"]).then(cs=>{
          socket.emit("login", cs);
        }).catch(e=>{
          console.log(e.msg);
        })
      })
    }   
    
    const getPlayerChannel = (playerId) => { 
        const playerRef = userRef.child(`/player/${playerId}`);
        playerRef.on('value', (snapshot) => {
          
          console.log(snapshot.val());
        }, (errorObject) => {
          console.log('The read failed: ' + errorObject.name);
        });
        socket.emit("login:player", CM.getChannels(adminId));
    }

    socket.on("login", login);
    socket.on("login1", login1);
    socket.on("login:player", getPlayerChannel);
}