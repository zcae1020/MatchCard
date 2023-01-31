import { getDatabase } from "firebase-admin/database";
import * as firebase from "../../config/firebase-config.js";
import { channel } from "../../domain/CHANNEL/channel.js";
import user from "../../domain/USER/user.js";
import player from "../../domain/USER/player.js";
import admin from "../../domain/USER/admin.js";
import { GM } from "../GROUP/groupManager.js";

const db = getDatabase();
const userRef = db.ref("user");
const connectionRef = db.ref("connection");
const groupRef = db.ref("group");

//crud
class userManager {
    whoIsUser(uid) {
        // user is admin or player? / admin: 0, player: 1
        userRef.child(`${uid}`).on("value", (snapshot) => {
            let user = snapshot.val();
            return user.hasOwnProperty("win") ? 1 : 0;
        });
        return -1;
    }

    connectUser(uid) {
        connectionRef.push().set({ uid: `${uid}` });
    }

    disconnectUser(uid) {
        connectionRef.on("value", (snapshot) => {
            for (let idx in snapshot.val()) {
                if (snapshot.val()[idx]["uid"] == uid) {
                    connectionRef.child(idx).set(null);
                }
            }
        });

        this.delCurrentLocation(uid);
    }

    async createAdmin(uid, id, password, name, groupName) {
        let groupId;
        await GM.getGroupByName(groupName).then((group) => (groupId = group["groupId"]));
        const ret = new admin(uid, id, password, name, groupId);
        userRef.child(`${uid}`).set(JSON.parse(JSON.stringify(ret)));

        groupRef.child(`${groupId}/users/${uid}`).set({ uid: uid });

        return ret;
    }

    async createUser(uid, id, password, name, groupName) {
        let groupId;
        await GM.getGroupByName(groupName).then((group) => (groupId = group["groupId"]));
        const ret = new player(uid, id, password, name, groupId);
        userRef.child(`${uid}`).set(JSON.parse(JSON.stringify(ret)));

        groupRef.child(`${groupId}/users/${uid}`).set({ uid: uid });

        return ret;
    }

    getUserByUid(uid) {
        return new Promise((resolve, reject) => {
            userRef.child(`${uid}`).on(
                "value",
                (snapshot) => {
                    let ret = snapshot.val();
                    resolve(ret);
                },
                (errorObject) => {
                    console.log("The read failed: " + errorObject.name);
                    reject(new Error());
                }
            );
        });
    }

    getUserByName(name) {
        return new Promise((resolve, reject) => {
            userRef.on("value", (snapshot) => {
                for (let idx in snapshot.val()) {
                    if (snapshot.val()[idx]["name"] == name) {
                        resolve(snapshot.val()[idx]);
                    }
                }
                reject(new Error());
            });
            reject(new Error());
        });
    }

    currentLocation(uid) {
        return new Promise((resolve, reject) => {
            userRef.child(`${uid}/currentLocation`).on("value", (snapshot) => {
                resolve(snapshot.val());
            });
            reject();
        });
    }

    setChannelId(uid, channelId) {
        if (uid != null) {
            userRef.child(`${uid}/currentLocation`).update({ channelId: channelId });
        }
    }

    setRoomId(uid, roomId) {
        if (uid != null) {
            userRef.child(`${uid}/currentLocation`).update({ roomId: roomId });
        }
    }

    setTeamId(uid, teamId) {
        if (uid != null) {
            userRef.child(`${uid}/currentLocation`).update({ teamId: teamId });
        }
    }

    delCurrentLocation(uid) {
        userRef.child(`${uid}/currentLocation`).update(null);
    }

    deleteUserByUid(uid) {}

    deleteUserByName(name) {}
}

export const UM = new userManager();
