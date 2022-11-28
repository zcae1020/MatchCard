import {getDatabase} from "firebase-admin/database";
import { UM } from "../USER/userManager.js";
import { currentChannel, curr } from "../../controller/CHANNEL/enter.js";

const db = getDatabase();
const channelRef = db.ref('channel');

class teamManager {

    putTeam(uid, channelId, roomId) {
        return new Promise((resolve, reject)=> {
            this.getOptimalTeam(channelId, roomId).then((teamId) => {
                console.log(channelId, roomId, teamId);
                const teamRef = channelRef.child(`${channelId}/rooms/${roomId}/teams/${teamId}`);
                this.getLengthById(channelId, roomId, teamId).then((length)=>{
                    teamRef.child(`users/${length}`).set({
                        uid: uid,
                        ready: false
                    });
                    teamRef.child('length').set(length + 1);
                })
                
                UM.setTeamId(uid, teamId);
                
                const roomRef = channelRef.child(`${channelId}/rooms/${roomId}`);
                roomRef.child('teams').on('value', (snapshot) => {
                    resolve(snapshot.val());
                })
            })
        })
    }

    getLengthById(channelId, roomId, teamId) {
        return new Promise((resolve, reject) => {
            const teamRef = channelRef.child(`${channelId}/rooms/${roomId}/teams/${teamId}`);
            teamRef.child('length').on('value', (snapshot) => {
                resolve(snapshot.val());
            })
        })
    }
  
    getOptimalTeam(channelId, roomId) {
        return new Promise((resolve, reject) => {
            const roomRef = channelRef.child(`${channelId}/rooms/${roomId}`);
            roomRef.child('teams').on('value', (snapshot) => {
                let mn = 10;
                let teamId = 0;
                let teams = snapshot.val();
                for(let id in teams) {
                    if(mn > teams[id].length) {
                        mn = teams[id].length;
                        teamId = id;
                    }
                }

                resolve(teamId);
            })
        })
    }
}

export const TM = new teamManager();