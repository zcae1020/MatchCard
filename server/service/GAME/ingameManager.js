import {getDatabase} from "firebase-admin/database";
import { currentChannel, currentRoom } from "../../controller/CHANNEL/enter.js";
import { gameManager } from "../../domain/GAME/gameManager.js";
import { TM } from "../CHANNEL/teamManager.js";

const db = getDatabase();

//const roomRef = db.ref(`channel/${currentChannel}/rooms/${currentRoom}`);
//const gameManagerRef = db.ref(`channel/${currentChannel}/rooms/${currentRoom}/gameManger`);
//const teamsRef = db.ref(`channel/${currentChannel}/rooms/${currentRoom}/teams`);   

const gamemanager = new gameManager(0);

class ingameManager {
    pickCard(row, col) {
        return new Promise((resolve, reject) => {
            const roomRef = db.ref(`channel/${currentChannel}/rooms/${currentRoom}`);
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

                        roomRef.child('/gameManager/pick').set(null);

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
            const gameManagerRef = db.ref(`channel/${currentChannel}/rooms/${currentRoom}/gameManger`);
            let personPerTeam = await this.#getPersonPerTeam();
            gameManagerRef.on(async snapshot => {
                let userTurn = snapshot.val()["userTurn"];
                let nextUserTurn = (userTurn + 1) % personPerTeam;
                gameManagerRef.child('userTurn').set(nextUserTurn);
                let teamTurn = await gamemanager.getTeamTurn(gameManagerRef);
                let nextUid = await this.getUidByCurrentTurn(nextUserTurn, teamTurn);
                resolve(nextUid);
            })
        })
    }

    getUidByCurrentTurn(userTurn, teamTurn) {
        return new Promise(async (resolve, reject) => {
            const teamsRef = db.ref(`channel/${currentChannel}/rooms/${currentRoom}/teams`);
        
            teamsRef.child(`/${teamTurn}/${userTurn}/users/uid`).on('value', snapshot => {
                let uid = snapshot.val();
                resolve(uid);
            })
        })
    }

    setCombo(num) {
        const gameManagerRef = db.ref(`channel/${currentChannel}/rooms/${currentRoom}/gameManger`);
        gamemanager.setCombo(gameManagerRef, num);
    }

    match(uid) {
        TM.getTeamIdByUid(uid).then(teamId => {
            const gameManagerRef = db.ref(`channel/${currentChannel}/rooms/${currentRoom}/gameManger`);
            gamemanager.plusTeamscore(gameManagerRef, teamId)
            gamemanager.plusCombo(gameManagerRef, num);
        })
    }

    #getPersonPerTeam() {
        return new Promise((resolve, reject) => {
            const teamsRef = db.ref(`channel/${currentChannel}/rooms/${currentRoom}/teams`);
            teamsRef.child('/0/length').on('value', async snapshot => {
                resolve(await snapshot.val());
            })
        })
    }

    #getCardIdByCardLocation(row, col) {
        return new Promise((resolve, reject) => {
            const roomRef = db.ref(`channel/${currentChannel}/rooms/${currentRoom}`);
            roomRef.child(`/gameManager/gameboard/${row}/${col}`).on(snapshot=>{
                resolve(snapshot.val());
            })
        })
    }
}

export const IGM = new ingameManager();