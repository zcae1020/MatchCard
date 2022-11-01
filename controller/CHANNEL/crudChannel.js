import express from 'express'
import {getDatabase} from 'firebase-admin/database';
import {CM} from "../../service/CHANNEL/channelManager.js";
import { UM } from '../../service/USER/userManager.js';
 
export const router = express.Router();
 
const db = getDatabase();
const userRef = db.ref('user');
 
export const crudChannel = (io, socket) => {
    const createChannel = (uid = 0, name = 'channel', maxRoom = 4, maxTeam = 4) => {
        if(uid!=0)
            socket.emit("channel:create", CM.createChannel(uid, name, maxRoom, maxTeam));
    }   
     
    const readChannel = (id = 0) => {
        //if(id) c = CM.getChannelById(id);
        //else if(name) c = CM.getChannelByName(name);

        CM.getChannelById(id).then(c=>socket.emit("channel:read", (c?c:"isNull"))).catch(e=>console.log(e));
    }

    const getChannelList = (uid) => {
        if(UM.whoIsUser(uid))
            socket.emit("admin channel list",CM.getChannelIdInGroup(uid));
        else
            socket.emit("admin channel list",CM.getChannelIdInGroup(uid));
    }

    const updateChannel = (name, maxRoom, maxTeam, channelId) => { 
    }

    const deleteChannel = (channelId) => { 
    }

    socket.on("create channel", createChannel);
    socket.on("admin channel list", getChannelList);
    socket.on("player channel list", getChannelList);
    //socket.on("channel:read", readChannel);
}