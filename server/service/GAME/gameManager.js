import {getDatabase} from "firebase-admin/database";
import { currentChannel, currentRoom } from "../../controller/CHANNEL/enter.js";

const db = getDatabase();
const channelRef = db.ref('channel');
const roomRef = db.ref(`channel/${currentChannel}/rooms/${currentRoom}`);
const teamsRef = db.ref(`channel/${currentChannel}/rooms/${currentRoom}/teams`);

class gameManager {
    ready(uid) {
        return new Promise(async (resolve, reject) => {
            let location = await this.getTeamsLocationByUid(uid);

            teamsRef.child(`/${location.teamId}/users/${location.idx}/ready`).on((snapshot) => {
                teamsRef.child(`/${location.teamId}/users/${location.idx}/ready`).set(snapshot.val() == 0 ? 1 : 0);
            })

            resolve(location);
        })
    }

    start() {
        return new Promise(async (resolve, reject) => {
            let maxTeam = await getMaxTeam();
            roomRef.child('/gameManager/maxTeam').set(maxTeam);
            teamsRef.on(snapshot => {
                roomRef.child('/gameManager/teams').set(snapshot.val());  
            })

            let arr = [];
            for(let i=0;i<maxTeam;i++) {
                arr.push(0);
            }

            roomRef.child('state').set(1);

            roomRef.child('/gameManager/teamscore').set(arr);

            roomRef.child('/gameManager').on(snapshot => {
                resolve(snapshot.val());
            });
        })
    }

    pickCard(row, col) {
        return new Promise((resolve, reject) => {
            roomRef.child('/gameManager').on(snapshot => {
                if(snapshot.val()['pick'] == 0) {
                    roomRef.child('/gameManager/pick').set({
                        row: row,
                        col: col
                    });
                    resolve(-1);
                }
                else {
                    roomRef.child('/gameManager/pick').on(async snapshot => {
                        let pick = snapshot.val();
                        let c1 = await this.getCardIdByCardLocation(pick.row, pick.col);
                        let c2 = await this.getCardIdByCardLocation(row, col);

                        if(c1 == c2) {
                            resolve(1);
                        }

                        resolve(0);
                    })
                }
            })
        })
    }



    #getCardIdByCardLocation(row, col) {
        return new Promise((resolve, reject) => {
            roomRef.child(`/gameManager/gameboard/${row}/${col}`).on(snapshot=>{
                resolve(snapshot.val());
            })
        })
    }

    #getMaxTeam() {
        return new Promise((resolve, reject) => {
            teamsRef.on((snapshot) => {
                let teams = snapshot.val();
                let ret = 0;

                for(let teamId in teams) {
                    if(teams[teamId]["length"] > 0) {
                        ret++;
                    }
                }

                resolve(ret);
            })
        })
    }

    #isAllReady() {
        return new Promise((resolve, reject) => {
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