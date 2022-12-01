import express from 'express'
import {getDatabase} from 'firebase-admin/database';
import { IGM } from '../../service/GAME/ingameManager.js';
import { currentChannel, currentRoom } from '../CHANNEL/enter.js';
 
export const router = express.Router();

const db = getDatabase();

export const game = (io, socket) => {
    const pickCard = (row, col, uid) => {
        let socketRoom = `${currentChannel}/${currentRoom}`;

        IGM.pickCard(io, socket, row, col).then(async res=>{
            let nextUid = await IGM.nextTurn();
            
            switch(res) {
                case -1: // 기존 카드 존재 x
                    break;
                case 0: // 매칭 x
                    IGM.setCombo(1);
                    nextUid = await IGM.nextTeam();
                    io.to(socketRoom).emit("fail match");
                    break;
                case 1: // 매칭 o
                // teamscore combo에 맞게 설정
                    IGM.match(row, col, uid).then(teamscore=>{
                        io.to(socketRoom).emit("success match", teamscore);
                    })
                    //isAllMatch
                    if(await IGM.isAllMatch()) {
                        IGM.allMatch();
                        io.to(socketRoom).emit("all match");
                    }
                    break;
            }

            let isNextRound = await IGM.isNextRound();
            if(isNextRound) {
                let isGameover = await IGM.isGameover();
                if(isGameover) {
                    IGM.gameover().then(teamscore =>{
                        io.to(socketRoom).emit("gameover", teamscore);
                    });
                }
                else {
                    IGM.nextRound().then(round=>{
                        io.to(socketRoom).emit("new round", round);
                    })
                }
            }

            io.to(socketRoom).emit("success pick card", row, col, nextUid);
        })
    }

    socket.on("pick card", pickCard);
};