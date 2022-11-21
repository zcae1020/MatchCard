import express from 'express'
import {getDatabase} from 'firebase-admin/database';
import {CM} from "../../service/CHANNEL/channelManager.js";
import {UM} from '../../service/USER/userManager.js';
 
export const router = express.Router();
 
const db = getDatabase();
const userRef = db.ref('user');
 
export const crudChannel = (io, socket) => {
    const createChannel = (uid, maxRoom, maxTeam) => {
        CM.createChannel(uid, maxRoom, maxTeam);
        getChannelListAdmin(uid);
    }   
     
    const readChannel = (id = 0) => {
        //if(id) c = CM.getChannelById(id);
        //else if(name) c = CM.getChannelByName(name);

        //CM.getChannelById(id).then(c=>socket.emit("channel:read", (c?c:"isNull"))).catch(e=>console.log(e));
    }

    const getChannelListAdmin = (uid) => {
        CM.getChannelListInGroupByUid(uid).then((r)=>{
            socket.emit("success admin channel list",r);
        });
    }

    const getChannelListPlayer = (uid) => {
        CM.getChannelListInGroupByUid(uid).then((r)=>{
            socket.emit("success player channel list",r);
        });
    }

    const updateChannel = (name, maxRoom, maxTeam, channelId) => { 
    }

    const deleteChannel = (uid, channelId) => { 
        CM.deleteChannelById(channelId)
        getChannelListAdmin(uid);
    }
    
    socket.on("create channel", createChannel);
    socket.on("delete channel", deleteChannel);
    socket.on("admin channel list", getChannelListAdmin);
    socket.on("player channel list", getChannelListPlayer);
}