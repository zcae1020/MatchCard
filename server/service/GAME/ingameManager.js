import {getDatabase} from "firebase-admin/database";
import { currentChannel, currentRoom } from "../../controller/CHANNEL/enter.js";
import { gameManager } from "../../domain/GAME/gameManager.js";
import { TM } from "../CHANNEL/teamManager.js";
import { GAM } from "./gameManager.js";

const db = getDatabase();

//const roomRef = db.ref(`channel/${currentChannel}/rooms/${currentRoom}`);
//const gameManagerRef = db.ref(`channel/${currentChannel}/rooms/${currentRoom}/gameManger`);
//const teamsRef = db.ref(`channel/${currentChannel}/rooms/${currentRoom}/teams`);   

const gamemanager = new gameManager(0);

class ingameManager {
    pickCard(row, col) {
        return new Promise((resolve, reject) => {
            const roomRef = db.ref(`channel/${currentChannel}/rooms/${currentRoom}`);
            roomRef.child('/gameManager').on('value', snapshot => {
                if(snapshot.val()['pick'] == 0) {
                    roomRef.child('/gameManager/pick').set({
                        row: row,
                        col: col
                    });
                    resolve(-1);
                }
                else {
                    roomRef.child('/gameManager/pick').on('value', async snapshot => {
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
            gameManagerRef.on('value', async snapshot => {
                let userTurn = snapshot.val()["userTurn"];
                let nextUserTurn = (userTurn + 1) % personPerTeam;
                gameManagerRef.child('userTurn').set(nextUserTurn);
                let teamTurn = await gamemanager.getTeamTurn(gameManagerRef);
                let nextUid = await this.getUidByCurrentTurn(nextUserTurn, teamTurn);
                resolve(nextUid);
            })
        })
    }

    nextTeam() {
        return new Promise(async (resolve, reject) => {
            const gameManagerRef = db.ref(`channel/${currentChannel}/rooms/${currentRoom}/gameManger`);
            let teamTurn = await gamemanager.getTeamTurn(gameManagerRef);
            let cntTeam = await GAM.getCntTeam();
            let nextTeamTurn = (teamTurn + 1) % cntTeam;
            gameManagerRef.child('userTurn').set(0);
            gameManagerRef.child('teamTurn').set(nextTeamTurn);
            //nextTeam이 다시 돌아온다면 round++;
            let nextUid = await this.getUidByCurrentTurn(0, nextTeamTurn);
            resolve(nextUid);
        })
    }

    nextRound() {
        return new Promise(async (resolve, reject) => {
            const gameManagerRef = db.ref(`channel/${currentChannel}/rooms/${currentRoom}/gameManger`);
            let round = await gamemanager.getRound(gameManagerRef);
            let nextRound = round + 1;
            gameManagerRef.child('/round').set(nextRound);
            resolve(nextRound);
        })
    }

    isGameover() {
        return new Promise(async (resolve, reject) => {
            const gameManagerRef = db.ref(`channel/${currentChannel}/rooms/${currentRoom}/gameManger`);
            let round = await gamemanager.getRound(gameManagerRef);
            if(round == 3) {
                resolve(true);
            }

            resolve(false);
        })
    }

    gameover() {
        return new Promise(async (resolve, reject) => {
            const roomRef = db.ref(`channel/${currentChannel}/rooms/${currentRoom}`);
            const gameManagerRef = db.ref(`channel/${currentChannel}/rooms/${currentRoom}/gameManger`);
            roomRef.child('/state').set(0);
            let teamscore = await gamemanager.getTeamscore(gameManagerRef);

            roomRef.child('/maxTeam').on('value', snapshot => {
                let maxTeam = snapshot.val();
                roomRef.child('/gameManager').set(new gameManager(maxTeam));  
            })

            resolve(teamscore);
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

    match(uid) { // match 되었다고 check하는 것 추가
        return new Promise((resolve, reject) => {
            TM.getTeamIdByUid(uid).then(async teamId => {
                const gameManagerRef = db.ref(`channel/${currentChannel}/rooms/${currentRoom}/gameManger`);
                await gamemanager.plusTeamscore(gameManagerRef, teamId)
                await gamemanager.plusCombo(gameManagerRef); // gameManger에서 resolve를 해줘야 넘어오나..??ㄴ
                gamemanager.getTeamscore(gameManagerRef).then(teamscore => {
                    resolve(teamscore);
                })
            })
        })
    }

    isNextRound() {
        return new Promise(async (resolve, reject) => {
            const gameManagerRef = db.ref(`channel/${currentChannel}/rooms/${currentRoom}/gameManger`);
            let teamturn = await gamemanager.getTeamTurn(gameManagerRef);
            let userturn = await gamemanager.getUserTurn(gameManagerRef);
            if(teamturn == 0 && userturn == 0) {
                resolve(true);
            }

            resolve(false);
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
            roomRef.child(`/gameManager/gameboard/${row}/${col}`).on('value', snapshot=>{
                resolve(snapshot.val());
            })
        })
    }
}

export const IGM = new ingameManager();