import {getDatabase} from "firebase-admin/database";
import { currentChannel, currentRoom } from "../../controller/CHANNEL/enter.js";
import { UM } from "../USER/userManager.js";

const db = getDatabase();
const channelRef = db.ref('channel');
const teamsRef = db.ref(`channel/${currentChannel}/rooms/${currentRoom}/teams`);

class gameManager {
    ready(uid) {
        let location = this.getTeamsLocationByUid(uid);

        teamsRef.child(`/${location.teamId}/ready/${idx}`).on((snapshot) => {
            if(snapshot.val() == 0) {
                teamsRef.child(`/${location.teamId}/ready/${idx}`).set(1);
            } else {
                teamsRef.child(`/${location.teamId}/ready/${idx}`).set(0);
            }
        })
    }

    getTeamsLocationByUid(uid) {
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

    getTeamLocationByUid(teamId, uid) {
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