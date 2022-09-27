/**
 * 로그인시 jwt 토큰 인식 및 인식확인 후 channel data
 */

import express from 'express'
import { decodeToken } from '../../middleware/index.js';
import { app } from '../../app.js';
import * as auth from 'firebase-admin/auth';
import * as db from 'firebase-admin/database';
import * as firebase from "../../config/firebase-config.js";

export const router = express.Router();

export const getAdminChannel = function(userId) {

}   

export const getPlayerChannel = function(userId) {
    
}