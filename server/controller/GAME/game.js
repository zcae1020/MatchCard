import express from 'express'
import {getDatabase} from 'firebase-admin/database';
import { IGM } from '../../service/GAME/ingameManager.js';
 
export const router = express.Router();

const db = getDatabase();

export const game = (io, socket) => {
    const pickCard = (row, col, uid) => {
        IGM.pickCard(row, col).then(async res=>{
            let nextUid = await IGM.nextTurn();
            
            switch(res) {
                case -1: // 기존 카드 존재 x
                    break;
                case 0: // 매칭 x
                    IGM.setCombo(1);
                    nextUid = await IGM.nextTeam();
                    socket.emit("fail match");
                    break;
                case 1: // 매칭 o
                // teamscore combo에 맞게 설정
                    IGM.match(row, col, uid).then(teamscore=>{
                        socket.emit("success match", teamscore);
                    })
                    //isAllMatch
                    break;
            }

            let isNextRound = await IGM.isNextRound();
            if(isNextRound) {
                let isGameover = await IGM.isGameover();
                if(isGameover) {
                    IGM.gameover();
                    socket.emit("")
                }
                else {
                    IGM.nextRound();
                }
            }

            socket.emit("success pick card", row, col, nextUid);
        })
    }

    socket.on("pick card", pickCard);
};