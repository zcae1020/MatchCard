import {getDatabase} from "firebase-admin/database";
import { UM } from "../USER/userManager.js";
import { currentChannel, currentRoom } from "../../controller/CHANNEL/enter.js";

const db = getDatabase();
const channelRef = db.ref('channel');

class teamManager {

    putTeam(uid, teamId) {
        return new Promise((resolve, reject)=> {
            const teamRef = channelRef.child(`${currentChannel}/rooms/${currentRoom}/teams/${teamId}`);
            const roomRef = channelRef.child(`${currentChannel}/rooms/${currentRoom}`);
            this.getLengthById(teamId).then((length)=>{
                teamRef.child(`users/${length}`).set({
                    uid: uid,
                    ready: false
                }).then(a => {
                    console.log(1);
                    teamRef.child('length').set(length + 1);

                    UM.setTeamId(uid, teamId);

                    this.#getUserCnt().then(userCnt => {
                        roomRef.child('userCnt').set(userCnt + 1);
                    })

                    roomRef.child('teams').on('value', async (snapshot) => {
                        resolve(snapshot.val());
                    })
                })
            })
        })
    }

    changeTeam(uid, dest) {
        console.log(uid, dest);
        return new Promise(async (resolve, reject) => {
            let teamId = await this.getTeamIdByUid(uid).catch(e=>console.log("e", e));
            console.log("change");
            //await this.takeUserOutInTeam(uid, teamId);
            //this.putTeam(uid, dest).then(teams=>{
             //   resolve(teams);
            //}).catch(e=>console.log(e));
        })
    }

    takeUserOutInTeam(uid, teamId) {
        return new Promise((resolve, reject) => {
            const teamRef = channelRef.child(`${currentChannel}/rooms/${currentRoom}/teams/${teamId}`);
            this.getLengthById(teamId).then((length)=>{
                teamRef.child('length').set(length - 1);

                console.log("take");
                UM.setTeamId(uid, null);

                teamRef.child('/users').on(snapshot => {
                    let newUsers = [];
                    let users = snapshot.val();
                    for(let user in users) {
                        if(user.uid != uid) {
                            newUsers.push(user);
                        }
                    }

                    teamRef.child('/users').set(newUsers);
                })
            })
        })
    }    

    getTeamIdByUid(uid) {
        return new Promise((resolve, reject) => {
            const roomRef = channelRef.child(`${currentChannel}/rooms/${currentRoom}`);
            roomRef.child('/teams').on('value', (snapshot) => {
                let teams = snapshot.val();
                console.log(teams)
                for(let id in teams) {
                    let users = teams[id]["users"];
                    console.log(users);
                    for(let idx in users) {
                        console.log(idx);
                        if(users[idx].uid == uid) {
                            resolve(id);
                        }
                    }
                }

                reject();
            })
        })
    }

    #getUserCnt() {
        const roomRef = channelRef.child(`${currentChannel}/rooms/${currentRoom}`);
        return new Promise((resolve, reject) => {
            roomRef.child('userCnt').on('value', (snapshot) => {
                resolve(snapshot.val());
            })
        })
    }

    getLengthById(teamId) {
        return new Promise((resolve, reject) => {
            const teamRef = channelRef.child(`${currentChannel}/rooms/${currentRoom}/teams/${teamId}`);
            teamRef.child('length').on('value', (snapshot) => {
                resolve(snapshot.val());
            })
        })
    }
  
    getOptimalTeam() {
        return new Promise((resolve, reject) => {
            const roomRef = channelRef.child(`${currentChannel}/rooms/${currentRoom}`);
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