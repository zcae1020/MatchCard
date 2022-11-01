import {getDatabase} from "firebase-admin/database";
import * as firebase from "../../config/firebase-config.js";
import {channel} from "../../domain/CHANNEL/channel.js";
import user from "../../domain/USER/user.js";
import player from "../../domain/USER/player.js";

const db = getDatabase();
const userRef = db.ref('user');

//crud
class userManager {
  createAdmin(){ // create direct in firebase
  }
  
  createUser(id, password, name, groupId){
    const newPostRef = userRef.push();
    const ret = new player(newPostRef.key, id, password, name, groupId);
    newPostRef.set(JSON.parse(JSON.stringify(ret)));

    // userRef.child(`${uid}/groupId`).on('value',(snapshot)=>{
    //   let groupId = snapshot.val();
    //   groupRef.child(`${groupId}/users`).push().set({uid:newPostRef.key});
    // },(e)=>{
    //   console.log(e);
    // })

    return ret;
  }

  getUserByUid(uid){
    return new Promise((resolve, reject)=>{
      userRef.child(`${uid}`).on('value', (snapshot)=>  {
        resolve(snapshot.val());
      }, (errorObject)=>{
        console.log('The read failed: ' + errorObject.name);
        reject(new Error());
      })
    })
  }

  getUserByName(name){
    return new Promise((resolve, reject)=>{
      userRef.on('value', (snapshot)=>{
        for(let idx in snapshot.val()){
          if(snapshot.val()[idx]['name']==name){
            resolve(snapshot.val()[idx]);
          }
        }
        reject(new Error());
      })
      reject(new Error());
    })
  }

  deleteUserByUid(uid){ 

  }

  deleteUserByName(name){ 

  }
}

export const UM = new userManager();