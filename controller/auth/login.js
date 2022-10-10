/**
 * 로그인시 jwt 토큰 인식 및 인식확인 후 channel data
 */

import { decodeToken } from '../../middleware/index.js';
import * as auth from 'firebase-admin/auth';
import {getDatabase} from 'firebase-admin/database';
import {CM} from "../../service/CHANNEL/channelManager.js";

const db = getDatabase();
const userRef = db.ref('user');

export const login = (io, socket) => {
    const getAdminChannel = async (adminId) => {

      CM.getChannels(adminId).then(cs=>{
        socket.emit("login:admin", cs);
      }).catch(e=>{
        console.log(e.msg);
      })

      // CM.getChannels(adminId).then(c=>{
      //   socket.emit("login:admin", c);
      // }).catch(e=>{
      //   console.log(e);
      // })
    }   
    
    const getPlayerChannel = (playerId) => { 
        const playerRef = userRef.child('player');
        playerRef.on('value', (snapshot) => {
            console.log(snapshot.val());
          }, (errorObject) => {
            console.log('The read failed: ' + errorObject.name);
          });
        socket.emit("login:player", CM.getChannels(adminId));
    }

    socket.on("login:admin", getAdminChannel);
    socket.on("login:player", getPlayerChannel);
}