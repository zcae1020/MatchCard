import { getDatabase } from "firebase-admin/database";
import { currentChannel, currentRoom } from "../../controller/CHANNEL/enter.js";

const db = getDatabase();

class gameManager {
    ready(uid) {
        return new Promise(async (resolve, reject) => {
            const teamsRef = db.ref(`channel/${currentChannel}/rooms/${currentRoom}/teams`);
            let location = await this.#getTeamsLocationByUid(uid);

            this.#getReady(location).then(async (ready) => {
                if (ready == false) {
                    await teamsRef.child(`/${location.teamId}/users/${location.idx}/ready`).set(true);
                } else {
                    await teamsRef.child(`/${location.teamId}/users/${location.idx}/ready`).set(false);
                }
                teamsRef.on("value", (snapshot) => {
                    resolve(snapshot.val());
                });
            });
        });
    }

    start() {
        return new Promise(async (resolve, reject) => {
            const roomRef = db.ref(`channel/${currentChannel}/rooms/${currentRoom}`);
            const teamsRef = db.ref(`channel/${currentChannel}/rooms/${currentRoom}/teams`);
            let cntTeam = await this.getCntTeam();
            roomRef.child("/gameManager/cntTeam").set(cntTeam);
            teamsRef.on("value", async (snapshot) => {
                await roomRef.child("/gameManager/teams").set(snapshot.val());
                roomRef.child("state").set(1);

                roomRef.child("/gameManager").on("value", (snapshot1) => {
                    resolve(snapshot1.val());
                });
            });
        });
    }

    getCntTeam() {
        return new Promise((resolve, reject) => {
            const roomRef = db.ref(`channel/${currentChannel}/rooms/${currentRoom}`);
            roomRef.child("teams").on("value", async (snapshot) => {
                let teams = snapshot.val();
                let cntTeam = 0;
                for (let idx in teams) {
                    if (teams[idx]["length"] > 0) {
                        cntTeam++;
                    }
                }
                resolve(cntTeam);
            });
        });
    }

    isAllReady() {
        return new Promise((resolve, reject) => {
            const teamsRef = db.ref(`channel/${currentChannel}/rooms/${currentRoom}/teams`);
            teamsRef.on("value", (snapshot) => {
                let teams = snapshot.val();
                let length = teams[0]["length"];

                for (let teamId in teams) {
                    if (length != teams[teamId]["length"]) {
                        resolve(false);
                    }
                }

                for (let teamId in teams) {
                    let len = teams[teamId]["length"];
                    for (let i = 0; i < len; i++) {
                        let ready = teams[teamId]["users"][i]["ready"];
                        if (ready == false) {
                            resolve(false);
                        }
                    }
                }

                resolve(true);
            });
        });
    }

    #getReady(location) {
        return new Promise((resolve, reject) => {
            const teamsRef = db.ref(`channel/${currentChannel}/rooms/${currentRoom}/teams`);
            teamsRef.child(`/${location.teamId}/users/${location.idx}/ready`).on("value", (snapshot) => {
                resolve(snapshot.val());
            });
        });
    }

    #getTeamsLocationByUid(uid) {
        return new Promise((resolve, reject) => {
            const teamsRef = db.ref(`channel/${currentChannel}/rooms/${currentRoom}/teams`);
            teamsRef.on("value", async (snapshot) => {
                for (let teamId in snapshot.val()) {
                    let idx = await this.#getTeamLocationByUid(teamId, uid);
                    if (idx > -1) {
                        resolve({
                            teamId: teamId,
                            idx: idx,
                        });
                    }
                }
            });
        });
    }

    #getTeamLocationByUid(teamId, uid) {
        return new Promise((resolve, reject) => {
            const teamsRef = db.ref(`channel/${currentChannel}/rooms/${currentRoom}/teams`);
            teamsRef.child(`/${teamId}`).on("value", (snapshot) => {
                let users = snapshot.val().users;
                for (let idx in users) {
                    if (uid == users[idx]["uid"]) {
                        resolve(idx);
                    }
                }
                resolve(-1);
            });
        });
    }
}

export const GAM = new gameManager();
