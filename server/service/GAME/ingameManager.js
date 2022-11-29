import {getDatabase} from "firebase-admin/database";
import { currentChannel, currentRoom } from "../../controller/CHANNEL/enter.js";
import { gameManager } from "../../domain/GAME/gameManager.js";

const db = getDatabase();
const roomRef = db.ref(`channel/${currentChannel}/rooms/${currentRoom}`);
const teamsRef = db.ref(`channel/${currentChannel}/rooms/${currentRoom}/teams`);
const gameManagerRef = db.ref(`channel/${currentChannel}/rooms/${currentRoom}/gameManger`);

class ingameManager {
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

    nextTurn() {
        return new Promise(async (resolve, reject) => {
            let personPerTeam = await this.#getPersonPerTeam();
            gameManagerRef.on(async snapshot => {
                let userTurn = snapshot.val()["userTurn"];
                let nextUserTurn = (userTurn + 1) % personPerTeam;
                gameManagerRef.child('userTurn').set(nextUserTurn);
                let nextUid = await this.getUidByCurrentTurn();
                resolve(nextUid);
            })
        })
    }

    getUidByCurrentTurn() {
        return new Promise(async (resolve, reject) => {
            let gamemanager = new gameManager(0);
            let userTurn = await gamemanager.getUserTurn(gameManagerRef);
            let teamTurn = await gamemanager.getTeamTurn(gameManagerRef);

            //////////ㅅturn에 맞는 uid return
        })
    }

    #getPersonPerTeam() {
        return new Promise((resolve, reject) => {
            teamsRef.child('/0/length').on('value', async snapshot => {
                resolve(await snapshot.val());
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
}

export const IGM = new ingameManager();