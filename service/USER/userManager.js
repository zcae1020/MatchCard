import {getDatabase} from "firebase-admin/database";
import {channel} from "../../domain/CHANNEL/channel.js";
import * as index from "../../domain/USER/index.js";
import user from "../../domain/USER/user.js";

const db = getDatabase();
const userRef = db.ref('user');

//crud
class userManager {
  createAdmin(){ // create direct in firebase
  }
  
  createPlayer(id, password, name, groupId){
    const newPostRef = userRef.push();
    const ret = new user(newPostRef.key, id, password, name, groupId);
    newPostRef.set(JSON.parse(JSON.stringify(ret)));

    userRef.child(`${uid}/groupId`).on('value',(snapshot)=>{
      let groupId = snapshot.val();
      groupRef.child(`${groupId}/users`).push().set({uid:newPostRef.key});
    },(e)=>{
      console.log(e);
    })

    return ret;
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