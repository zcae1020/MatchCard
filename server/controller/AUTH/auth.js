/**
 * 로그인시 jwt 토큰 인식 및 인식확인 후 channel data
 */

import * as auth from 'firebase-admin/auth';
import {getDatabase} from 'firebase-admin/database';
import {CM} from "../../service/CHANNEL/channelManager.js";
import { decodeToken } from '../../middleware/index.js';
import { UM } from '../../service/USER/userManager.js';

const db = getDatabase();
const userRef = db.ref('user');

export const login = (io, socket) => {
    const player_login = (jwt, uid) => {
      UM.connectUser(uid);
      socket.emit("success player login", "success");
    }

    const admin_login = (jwt, uid) => {
      UM.connectUser(uid);
      socket.emit("success admin login", "success");
    }

    socket.on("player login", player_login);
    socket.on("admin login", admin_login);
}