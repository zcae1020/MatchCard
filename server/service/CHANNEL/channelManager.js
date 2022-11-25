import {getDatabase} from "firebase-admin/database";
import {channel} from "../../domain/CHANNEL/channel.js";
import * as firebase from "../../config/firebase-config.js";
import { GM } from "../GROUP/groupManager.js";

const db = getDatabase();
const channelRef = db.ref('channel');
const groupRef = db.ref('group');

class channelManager {
  async createChannel(uid, maxRoom, maxTeam){ //firebase에서 channel 저장, id는 firebase에서 만들어준 id사용4
    return new Promise(async (resolve, reject) =>{
      await GM.getGroupByUid(uid).then((group)=>{
        const newPostRef = channelRef.push();
        let groupId = group["groupId"]
        const ret = new channel(newPostRef.key, maxRoom, maxTeam, groupId);
        newPostRef.set(JSON.parse(JSON.stringify(ret)));

        groupRef.child(`${groupId}/channels/${newPostRef.key}`).set({channelId:newPostRef.key});
        resolve(ret);
      }).catch((e) => {
        reject(e);
      })
    })
  }

  getChannelById(channelId){ //firebase에서 id로 channel 가져오기
    return new Promise((resolve, reject)=>{
      channelRef.child(`/${channelId}`).on('value', (snapshot)=>  {
        resolve(snapshot.val());
      }, (errorObject)=>{
        console.log('The read failed: ' + errorObject.name);
        reject(new Error());
      })
    })
  }

  getChannelListInGroupByUid(uid){ // group이 관리하는 channelId들 가져오기
    return new Promise((resolve, reject)=>{
      GM.getGroupByUid(uid).then((group) => {
        let groupId = group["groupId"];
        groupRef.child(`/${groupId}/channels`).on('value', async (snapshot)=>{
          let ret = [];
          for(let idx in snapshot.val()){
            ret.push(snapshot.val()[idx]['channelId']);
          }
          resolve(ret);
        }, (errorObject)=>{
          console.log('The read failed: ' + errorObject.name);
          reject(new Error());
        })
      })
    });
  }

  deleteChannelById(channelId){ //firebase에서 id로 channel 지우기
    return new Promise((resolve, reject)=>{
      GM.getGroupByChannelId(channelId).then((group)=>{
        let groupId = group["groupId"];
        groupRef.child(`${groupId}/channels/${channelId}`).set(null);
        channelRef.child(`${channelId}`).set(null);
        resolve();
      }).catch((e) => {
        reject(e);
      })
    });
  }
}

export const CM = new channelManager();