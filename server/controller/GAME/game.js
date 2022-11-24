import express from 'express'
import {getDatabase} from 'firebase-admin/database';
import {CM} from "../../service/CHANNEL/channelManager.js";
import {UM} from '../../service/USER/userManager.js';
 
export const router = express.Router();
 
const db = getDatabase();
const userRef = db.ref('user');
 
export const crudChannel = (io, socket) => {
    const createChannel = (uid, maxRoom, maxTeam) => {
        return new Promise((resolve, reject) => {
            CM.createChannel(uid, maxRoom, maxTeam);
            getChannelListAdmin(uid);
            resolve();
        })
    }   
     
    const readChannel = (id = 0) => {
        //if(id) c = CM.getChannelById(id);
        //else if(name) c = CM.getChannelByName(name);

        //CM.getChannelById(id).then(c=>socket.emit("channel:read", (c?c:"isNull"))).catch(e=>console.log(e));
    }

    const getChannelListAdmin = (uid) => {
        return new Promise((resolve, reject) => {
            CM.getChannelListInGroupByUid(uid).then((r)=>{
                socket.emit("success admin channel list",r);
            });
            resolve();
        })
    }

    const getChannelListPlayer = (uid) => {
        return new Promise((resolve, reject) => {
            CM.getChannelListInGroupByUid(uid).then((r)=>{
                socket.emit("success player channel list",r);
            });
            resolve();
        })
    }

    const updateChannel = (name, maxRoom, maxTeam, channelId) => { 
    }

    const deleteChannel = (uid, channelId) => { 
        return new Promise((resolve, reject) => {
            CM.deleteChannelById(channelId)
            getChannelListAdmin(uid);
            resolve();
        })
    }
    
    socket.on("create channel", createChannel);
    socket.on("delete channel", deleteChannel);
    socket.on("admin channel list", getChannelListAdmin);
    socket.on("player channel list", getChannelListPlayer);
}