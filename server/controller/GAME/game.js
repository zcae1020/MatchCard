import express from 'express'
import {getDatabase} from 'firebase-admin/database';
import { IGM } from '../../service/GAME/ingameManager.js';
 
export const router = express.Router();

const db = getDatabase();
const channelRef = db.ref("channel");

export const game = (io, socket) => {
    const pickCard = (row, col, uid) => {
        IGM.pickCard(row, col).then(res=>{
            let nextUid = IGM.nextTurn(uid);
            
            switch(res) {
                case -1: // 기존 카드 존재 x
                    break;
                case 0: // 매칭 x
                    break;
                case 1: // 매칭 o
                    break;
            }
        })
    }

    socket.on("pick card", pickCard);
};
