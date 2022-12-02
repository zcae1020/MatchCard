import {getDatabase} from "firebase-admin/database";
import { currentChannel, currentRoom } from "../../controller/CHANNEL/enter.js";
import { gameManager } from "../../domain/GAME/gameManager.js";
import { TM } from "../CHANNEL/teamManager.js";
import { GAM } from "./gameManager.js";

const db = getDatabase();

//const roomRef = db.ref(`channel/${currentChannel}/rooms/${currentRoom}`);
//const gameManagerRef = db.ref(`channel/${currentChannel}/rooms/${currentRoom}/gameManager`);
//const teamsRef = db.ref(`channel/${currentChannel}/rooms/${currentRoom}/teams`);   

const gamemanager = new gameManager(0);
const MAX_ROUND = 5;

class ingameManager {
    async pickCard(io, socket, row, col) { // interval 추가
        return new Promise((resolve, reject) => {
            const roomRef = db.ref(`channel/${currentChannel}/rooms/${currentRoom}`);
            const gameManagerRef = db.ref(`channel/${currentChannel}/rooms/${currentRoom}/gameManager`);
            gamemanager.getPick(gameManagerRef).then(async pick=>{
                if(pick == null) {
                    roomRef.child('/gameManager/pick').set({
                        row: row,
                        col: col
                    });
                    resolve(-1);
                }
                else {
                    let c = await this.getCardIdByCardLocation(pick.row, pick.col);
                    let curCardId = await this.getCardIdByCardLocation(row, col);

                    roomRef.child('/gameManager/pick').set(null);

                    if(c == curCardId) {
                        resolve(1);
                    }

                    resolve(0);
                }
            })
        })
    }

    nextTurn() {
        return new Promise(async (resolve, reject) => {
            const gameManagerRef = db.ref(`channel/${currentChannel}/rooms/${currentRoom}/gameManager`);
            let personPerTeam = await this.#getPersonPerTeam();
            gameManagerRef.on('value', async snapshot => {
                let userTurn = snapshot.val()["userTurn"];
                let nextUserTurn = (userTurn + 1) % personPerTeam;
                gameManagerRef.child('userTurn').set(nextUserTurn);
                let nextUid = await this.getUidByCurrentTurn();
                resolve(nextUid);
            })
        })
    }

    nextTeam() {
        return new Promise(async (resolve, reject) => {
            const gameManagerRef = db.ref(`channel/${currentChannel}/rooms/${currentRoom}/gameManager`);
            let teamTurn = await gamemanager.getTeamTurn(gameManagerRef);
            let cntTeam = await GAM.getCntTeam();
            let nextTeamTurn = (teamTurn + 1) % cntTeam;
            await gameManagerRef.child('userTurn').set(0);
            await gameManagerRef.child('teamTurn').set(nextTeamTurn);
            if(nextTeamTurn == 0) {
                let round = await gamemanager.getRound(gameManagerRef);
                gameManagerRef.child('round').set(round + 1);    
            }
            let nextUid = await this.getUidByCurrentTurn();
            let isNextRound = false;
            if(nextTeamTurn == 0 && teamTurn != 0) {
                isNextRound = true;
            }
            resolve({
                nextUid:nextUid,
                isNextRound:isNextRound
            });
        })
    }

    nextRound() {
        return new Promise(async (resolve, reject) => {
            const gameManagerRef = db.ref(`channel/${currentChannel}/rooms/${currentRoom}/gameManager`);
            let round = await gamemanager.getRound(gameManagerRef);
            resolve(round);
        })
    }

    isGameover() {
        return new Promise(async (resolve, reject) => {
            const gameManagerRef = db.ref(`channel/${currentChannel}/rooms/${currentRoom}/gameManager`);
            let round = await gamemanager.getRound(gameManagerRef);
            if(round == MAX_ROUND + 1) {
                resolve(true);
            }

            resolve(false);
        })
    }

    gameover() {
        return new Promise(async (resolve, reject) => {
            const roomRef = db.ref(`channel/${currentChannel}/rooms/${currentRoom}`);
            const gameManagerRef = db.ref(`channel/${currentChannel}/rooms/${currentRoom}/gameManager`);
            roomRef.child('/state').set(0);
            let teamscore = await gamemanager.getTeamscore(gameManagerRef);

            roomRef.child('/maxTeam').on('value', snapshot => {
                let maxTeam = snapshot.val();

                roomRef.child('/gameManager').set(JSON.parse(JSON.stringify(new gameManager(maxTeam))));  
            })

            resolve(teamscore);
        })
    }

    getUidByCurrentTurn() {
        return new Promise(async (resolve, reject) => {
            const teamsRef = db.ref(`channel/${currentChannel}/rooms/${currentRoom}/teams`);
            const gameManagerRef = db.ref(`channel/${currentChannel}/rooms/${currentRoom}/gameManager`);
            let teamTurn = await gamemanager.getTeamTurn(gameManagerRef);
            let userTurn = await gamemanager.getUserTurn(gameManagerRef);
            teamsRef.child(`/${teamTurn}/users/${userTurn}/uid`).on('value', snapshot => {
                let uid = snapshot.val();
                resolve(uid);
            })
        })
    }

    setCombo(num) {
        const gameManagerRef = db.ref(`channel/${currentChannel}/rooms/${currentRoom}/gameManager`);
        gamemanager.setCombo(gameManagerRef, num);
    }

    match(row, col, uid) { // match 되었다고 check하는 것 추가
        return new Promise((resolve, reject) => {
            TM.getTeamIdByUid(uid).then(async teamId => {
                const gameManagerRef = db.ref(`channel/${currentChannel}/rooms/${currentRoom}/gameManager`);
                await gamemanager.plusTeamscore(gameManagerRef, teamId)
                await gamemanager.plusCombo(gameManagerRef); // gameManager에서 resolve를 해줘야 넘어오나..??

                let cardId = await this.getCardIdByCardLocation(row, col);
                gameManagerRef.child(`/cardsState/${cardId}`).set(1);

                gamemanager.getTeamscore(gameManagerRef).then(teamscore => {
                    resolve(teamscore);
                })
            })
        })
    }

    isAllMatch() {
        return new Promise((resolve, reject) => {
            const gameManagerRef = db.ref(`channel/${currentChannel}/rooms/${currentRoom}/gameManager`);
            gamemanager.getCardsState(gameManagerRef).then(cardsState => {
                for(let idx in cardsState) {
                    if(cardsState[idx] == 0) {
                        resolve(false);
                    }
                }

                resolve(true);
            })
        }) 
    }

    allMatch() {
        return new Promise(async (resolve, reject) => {
            const gameManagerRef = db.ref(`channel/${currentChannel}/rooms/${currentRoom}/gameManager`);
            await gamemanager.setNewGameboard(gameManagerRef);
            await gameManagerRef.child(`/cardsState`).set([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]);
            resolve(0);
        })
    }

    /*
    isNextRound() {
        return new Promise(async (resolve, reject) => {
            const gameManagerRef = db.ref(`channel/${currentChannel}/rooms/${currentRoom}/gameManager`);
            let teamturn = await gamemanager.getTeamTurn(gameManagerRef);
            let userturn = await gamemanager.getUserTurn(gameManagerRef);
            if(teamturn == 0 && userturn == 0) {
                resolve(true);
            }

            resolve(false);
        })
    }
    */

    getCardIdByCardLocation(row, col) {
        return new Promise((resolve, reject) => {
            const gameManagerRef = db.ref(`channel/${currentChannel}/rooms/${currentRoom}/gameManager`);
            gameManagerRef.child(`/gameBoard/cards/${row}/${col}`).on('value', snapshot=>{
                let cardId = snapshot.val();
                resolve(cardId);
            })
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
}

export const IGM = new ingameManager();