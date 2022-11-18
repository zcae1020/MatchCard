import {getDatabase} from "firebase-admin/database";
import * as firebase from "../../config/firebase-config.js";
import { group } from "../../domain/group.js";

const db = getDatabase();
const groupRef = db.ref('group');

//crud
class groupManager {
  
  createGroup(name){
    const newPostRef = groupRef.push();
    const ret = new group(newPostRef.key, name);
    newPostRef.set(JSON.parse(JSON.stringify(ret)));

    return ret;
  }

  getGroupByGroupId(groupId){
    return new Promise((resolve, reject)=>{
        groupRef.child(`${groupId}`).on('value', (snapshot)=>  {
          resolve(snapshot.val());
        }, (errorObject)=>{
          console.log('The read failed: ' + errorObject.name);
          reject(new Error());
        })
      })
  }

  getGroupByName(name){
    return new Promise((resolve, reject)=>{
        groupRef.on('value', (snapshot)=>  {
            for(let idx in snapshot.val()){
                if(snapshot.val()[idx]['name']==name){
                  resolve(snapshot.val()[idx]);
                }
            }
            reject(new Error());
        }, (errorObject)=>{
          console.log('The read failed: ' + errorObject.name);
          reject(new Error());
        })
      })
  }

  getGroupByUid(uid){
    console.log(uid);
    return new Promise((resolve, reject)=>{
        db.ref('user').child(`${uid}`).on('value', async (snapshot)=>  {
          resolve(await this.getGroupByGroupId(snapshot.val()['groupId']));
        }, (errorObject)=>{
          console.log('The read failed: ' + errorObject.name);
          reject(new Error());
        })
      })
  }

  getGroupByChannelId(channelId){
    return new Promise((resolve, reject)=>{
        db.ref('channel').child(`${channelId}`).on('value', async (snapshot)=>  {
          resolve(await this.getGroupByGroupId(snapshot.val()['groupId']));
        }, (errorObject)=>{
          console.log('The read failed: ' + errorObject.name);
          reject(new Error());
        })
      })
  }

  deleteGroupByGroupId(groupId){

  }
}

export const GM = new groupManager();