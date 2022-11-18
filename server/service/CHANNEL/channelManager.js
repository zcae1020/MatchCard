import {getDatabase} from "firebase-admin/database";
import {channel} from "../../domain/CHANNEL/channel.js";
import * as firebase from "../../config/firebase-config.js";
import { GM } from "../GROUP/groupManager.js";

const db = getDatabase();
const channelRef = db.ref('channel');
const groupRef = db.ref('group');

class channelManager {
  async createChannel(uid, maxRoom, maxTeam){ //firebase에서 channel 저장, id는 firebase에서 만들어준 id사용
    const newPostRef = channelRef.push();
    let groupId;
    await GM.getGroupByUid(uid).then((group)=>groupId = group["groupId"]);
    const ret = new channel(newPostRef.key, maxRoom, maxTeam, groupId);
    newPostRef.set(JSON.parse(JSON.stringify(ret)));

    groupRef.child(`${groupId}/channels`).push().set({channelId:newPostRef.key});

    return ret;
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

  getChannelByName(channelName){ //firebase에서 name으로 channel 가져오기
    //필요할때 구현
  }

  getChannelIdInGroup(groupId){ // group이 관리하는 channelId들 가져오기
    return new Promise((resolve, reject)=>{
      groupRef.child(`/${groupId}/channels`).on('value', async (snapshot)=>{
        resolve(snapshot.val());
      }, (errorObject)=>{
        console.log('The read failed: ' + errorObject.name);
        reject(new Error());
      })
    })
  }

  deleteChannelInGroup(channelId){
    let groupId;
    channelRef.child(`${channelId}`).on('value', (snapshot)=>{
      groupId = snapshot.val()['groupId'];
    }, (errorObject)=>{
      console.log('The read failed: ' + errorObject.name);
    });

    return groupRef.child(`${groupId}/channels/${channelId}`).set(null);
  }

  deleteChannelInChannelRef(channelId){
    return channelRef.child(`${channelId}`).set(null);
  }

  deleteChannelById(channelId){ //firebase에서 id로 channel 지우기
    return this.deleteChannelInGroup(channelId) && this.deleteChannelInChannelRef(channelId);
  }

  deleteChannelByName(channelName){ //firebase에서 name로 channel 지우기

  }
}

export const CM = new channelManager();