import {getDatabase} from "firebase-admin/database";
import { currentChannel, currentRoom } from "../../controller/CHANNEL/enter.js";

const db = getDatabase();

class gameManager {
    ready(uid) {
        return new Promise(async (resolve, reject) => {
            const roomRef = db.ref(`channel/${currentChannel}/rooms/${currentRoom}`);
            const teamsRef = db.ref(`channel/${currentChannel}/rooms/${currentRoom}/teams`);
            let location = await this.getTeamsLocationByUid(uid);

            teamsRef.child(`/${location.teamId}/users/${location.idx}/ready`).on((snapshot) => {
                teamsRef.child(`/${location.teamId}/users/${location.idx}/ready`).set(snapshot.val() == 0 ? 1 : 0);
            })

            resolve(location);
        })
    }

    start() {
        return new Promise(async (resolve, reject) => {
            const roomRef = db.ref(`channel/${currentChannel}/rooms/${currentRoom}`);
            const teamsRef = db.ref(`channel/${currentChannel}/rooms/${currentRoom}/teams`);
            let cntTeam = await getCntTeam();
            roomRef.child('/gameManager/cntTeam').set(cntTeam);
            teamsRef.on(snapshot => {
                roomRef.child('/gameManager/teams').set(snapshot.val());  
            })

            roomRef.child('state').set(1);

            roomRef.child('/gameManager').on(snapshot => {
                resolve(snapshot.val());
            });
        })
    }

    getCntTeam() {
        return new Promise((resolve, reject) => {
            const roomRef = db.ref(`channel/${currentChannel}/rooms/${currentRoom}`);
            roomRef.child('teams').on(async snapshot=> {
                let teams = snapshot.val();
                let cntTeam = 0;
                for(let idx in teams) {
                    if(teams[idx]["length"] > 0) {
                        cntTeam++;
                    }
                }
                resolve(cntTeam);
            })
        })
    }

    #isAllReady() {
        return new Promise((resolve, reject) => {
            const teamsRef = db.ref(`channel/${currentChannel}/rooms/${currentRoom}/teams`);
            teamsRef.on(snapshot => {
                let teams = snapshot.val();
                let length = teams[0]["length"];

                for(let teamId in teams) {
                    if(length != teams[teamId]["length"]) {
                        resolve(false);
                    }
                }

                for(let teamId in teams) {
                    for(let i=0;i<length;i++) {
                        if(teams[teamId][users][i]["ready"] == 0) {
                            resolve(false);
                        }
                    }
                }

                resolve(true);
            })
        })
    }

    #getTeamsLocationByUid(uid) {
        return new Promise((resolve, reject) => {
            const teamsRef = db.ref(`channel/${currentChannel}/rooms/${currentRoom}/teams`);
            teamsRef.on('value', async (snapshot) => {
                for(let teamId in snapshot.val()) {
                    let idx = await this.getTeamLocationByUid(teamId, uid);
                    if(idx > -1) {
                        resolve({
                            teamId: teamId,
                            idx: idx
                        });
                    }
                }
            })
        })
    }

    #getTeamLocationByUid(teamId, uid) {
        return new Promise((resolve, reject) => {
            teamsRef.child(`/${teamId}`).on('value', (snapshot) => {
                let users = snapshot.val().users;
                for(let idx in users) {
                    if(uid == users[idx]) {
                        resolve(idx);
                    }
                }
                resolve(-1);
            })
        })
    }
}

export const GAM = new gameManager();