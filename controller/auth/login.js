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

export const getAdminChannel = function(io) {
    
}   

export const getPlayerChannel = function(io) {
    
}

router.get('/', (req, res)=>{
    app.use(decodeToken);
    
    res.send("fjsaksa");

    getAuth()
        .getUserByEmail(req.headers.email)
        .then((userRecord) => {
            // See the UserRecord reference doc for the contents of userRecord.
            console.log(`Successfully fetched user data: ${userRecord.toJSON()}`);


            //group에 맞는 channel send


        })
        .catch((error) => {
            console.log('Error fetching user data:', error);
        });
})