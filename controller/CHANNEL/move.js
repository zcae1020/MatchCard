/**
 * 채널 정보 return, 방 정보 return
 */

 import {getDatabase} from 'firebase-admin/database';
 import {CM} from "../../service/CHANNEL/channelManager.js";
 
 const db = getDatabase();
 const userRef = db.ref('user');
 
 export const login = (io, socket) => {
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
     socket.on("login:player", getPlayerChannel);
 }