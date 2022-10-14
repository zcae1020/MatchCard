/**
 * 로그인시 jwt 토큰 인식 및 인식확인 후 channel data
 */

import express from 'express'
import { decodeToken } from '../../middleware/index.js';
import * as auth from 'firebase-admin/auth';
import {getDatabase} from 'firebase-admin/database';
import * as firebase from "../../config/firebase-config.js";
import {CM} from "../../service/CHANNEL/channelManager.js";
 
export const router = express.Router();
 
const db = getDatabase();
const userRef = db.ref('user');
 
export const crudChannel = (io, socket) => {
    const createChannel = (uid, name, maxRoom, maxTeam) => {
        socket.emit("channel:create", CM.createChannel(uid, name, maxRoom, maxTeam));
    }   
     
    const readChannel = (id) => {
        let c = null;

        //if(id) c = CM.getChannelById(id);
        //else if(name) c = CM.getChannelByName(name);

        CM.getChannelById(id).then(c=>socket.emit("channel:read", c)).catch(e=>console.log(e));
    }

    const updateChannel = (name, maxRoom, maxTeam, channelId) => { 
    }

    const deleteChannel = (channelId) => { 
    }

    socket.on("channel:create", createChannel);
    socket.on("channel:read", readChannel);
}