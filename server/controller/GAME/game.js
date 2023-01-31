import express from "express";
import { getDatabase } from "firebase-admin/database";
import { IGM } from "../../service/GAME/ingameManager.js";
import { currentChannel, currentRoom } from "../CHANNEL/enter.js";

export const router = express.Router();

const db = getDatabase();

export const game = (io, socket) => {
    const pickCard = async (row, col, uid) => {
        let cardId = await IGM.getCardIdByCardLocation(row, col);
        console.log("pickcard");
        let socketRoom = `${currentChannel}/${currentRoom}`;

        IGM.pickCard(io, socket, row, col).then(async (res) => {
            let nextUid = await IGM.nextTurn();

            switch (res) {
                case -1: // 기존 카드 존재 x
                    break;
                case 0: // 매칭 x
                    IGM.setCombo(1);
                    let res = await IGM.nextTeam();
                    let isNextRound = res.isNextRound;
                    nextUid = res.nextUid;
                    console.log("fail");
                    io.to(socketRoom).emit("fail match");

                    if (isNextRound) {
                        let isGameover = await IGM.isGameover();
                        if (isGameover) {
                            console.log("gameover");
                            IGM.gameover().then((teamscore) => {
                                io.to(socketRoom).emit("gameover", teamscore);
                            });
                        } else {
                            console.log("next round");
                            IGM.nextRound().then((round) => {
                                io.to(socketRoom).emit("new round", round);
                            });
                        }
                    }
                    break;
                case 1: // 매칭 o
                    // teamscore combo에 맞게 설정
                    console.log("match");
                    IGM.match(row, col, uid).then(async (teamscore) => {
                        console.log("emit match", teamscore);
                        io.to(socketRoom).emit("success match", teamscore);

                        let isAllMatch = await IGM.isAllMatch();
                        if (isAllMatch) {
                            console.log("all match");
                            IGM.allMatch();
                            io.to(socketRoom).emit("all match");
                        }
                    });
                    //isAllMatch
                    break;
            }

            io.to(socketRoom).emit("success pick card", row, col, cardId, nextUid);
        });
    };

    socket.on("pick card", pickCard);
};
