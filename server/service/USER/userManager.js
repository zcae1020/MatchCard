import {getDatabase} from "firebase-admin/database";
import * as firebase from "../../config/firebase-config.js";
import {channel} from "../../domain/CHANNEL/channel.js";
import user from "../../domain/USER/user.js";
import player from "../../domain/USER/player.js";
import { GM } from "../GROUP/groupManager.js";

const db = getDatabase();
const userRef = db.ref('user');
const connectionRef = db.ref('connection');
const groupRef = db.ref('group');

//crud
class userManager {
  whoIsUser(uid){ // user is admin or player? / admin: 0, player: 1
    userRef.child(`${uid}`).on('value', (snapshot)=>{
      let user = snapshot.val();
      console.log(user);
      return (user.hasOwnProperty('win')?1:0);
    })
    return -1;
  }

  connectUser(uid){
    connectionRef.push().set({uid:`${uid}`})
  }

  disconnectUser(uid){
    connectionRef.on('value', (snapshot) => {
      for(let idx in snapshot.val()){
        if(snapshot.val()[idx]['uid']==uid){
          connectionRef.child(idx).set(null);
        }
      }
    })
  }

  createAdmin(){ // create direct in firebase
  }
  
  async createUser(data){
    let uid = data["uid"]
    let id = data["email"];
    let password = data["password"];
    let name = data["userName"];
    let groupName = data["group"];
    let groupId;

    await GM.getGroupByName(groupName).then((group)=>groupId = group["groupId"]);
    const ret = new player(uid, id, password, name, groupId);
    userRef.set({uid: JSON.parse(JSON.stringify(ret))});

    db.ref('group').child(`${groupId}/users`).on('value',(snapshot)=>{
      let groupId = snapshot.val();
      groupRef.child(`${groupId}/users`).push().set({uid:newPostRef.key});
    },(e)=>{
      console.log(e);
    })

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