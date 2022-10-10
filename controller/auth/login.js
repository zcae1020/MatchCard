/**
 * 로그인시 jwt 토큰 인식 및 인식확인 후 channel data
 */

import express from 'express'
import { decodeToken } from '../../middleware/index.js';
import * as auth from 'firebase-admin/auth';
import {getDatabase} from 'firebase-admin/database';
import * as firebase from "../../config/firebase-config.js";
import {CM} from "../channel/channelManager.js";

export const router = express.Router();

const db = getDatabase();
const userRef = db.ref('user');

export const login = (io, socket) => {
    const getAdminChannel = (adminId) => {
        socket.emit("login:admin", (name)=>{
          console.log(name);
        });
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