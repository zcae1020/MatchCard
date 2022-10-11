import {getDatabase} from "firebase-admin/database";
import {channel} from "../../domain/CHANNEL/channel.js";
import * as index from "../../domain/USER/index.js";

const db = getDatabase();
const userRef = db.ref('user');

//crud
class userManager {
  createAdmin(){

  }
  
  createPlayer(){

  }

  getAdminByAdminId(adminId){
    return new Promise((resolve, reject)=>{
      userRef.child(`/player/${playerId}`).on('value', async (snapshot)=>  {
        resolve(await this.getAdminByAdminId(snapshot.val()["adminId"]))
      }, (errorObject)=>{
        console.log('The read failed: ' + errorObject.name);
        reject(new Error());
      })
    })
  }

  getAdminByPlayerId(playerId){
    return new Promise((resolve, reject)=>{
      userRef.child(`/player/${playerId}`).on('value', async (snapshot)=>  {
        resolve(await this.getAdminByAdminId(snapshot.val()["adminId"]))
      }, (errorObject)=>{
        console.log('The read failed: ' + errorObject.name);
        reject(new Error());
      })
    })
  }
}

export const UM = new userManager();