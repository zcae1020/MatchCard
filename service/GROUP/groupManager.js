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
    
  }

  getGroupByName(name){
    
  }

  getGroupByUid(uid){
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

  }

  deleteGroupByGroupId(groupId){

  }
}

export const GM = new groupManager();