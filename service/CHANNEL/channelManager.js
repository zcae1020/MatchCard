import {getDatabase} from "firebase-admin/database";
import {channel} from "../../domain/CHANNEL/channel.js";

const db = getDatabase();
const channelRef = db.ref('channel');
const userRef = db.ref('user');
const groupRef = db.ref('group');

class channelManager {
  createChannel(uid, name, maxRoom, maxTeam){ //firebase에서 channel 저장, id는 firebase에서 만들어준 id사용
    const newPostRef = channelRef.push();
    const ret = new channel(newPostRef.key, name, maxRoom, maxTeam);
    newPostRef.set(JSON.parse(JSON.stringify(ret)));

    
    userRef.child(`${uid}/groupId`).on('value',(snapshot)=>{
      let groupId = snapshot.val();
      groupRef.child(`${groupId}/channels`).push().set({channelId:newPostRef.key});
    },(e)=>{
      console.log(e);
    })

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

  deleteChannelById(channelId){ //firebase에서 id로 channel 지우기

  }

  deleteChannelByName(channelName){ //firebase에서 name로 channel 지우기

  }
}

export const CM = new channelManager();

// CM.getChannelById(CM.createChannel("alalal", 4,0).id).then((channel)=>{
//   console.log(channel["room"][0]["gameboard"]);
// }).catch((error)=>{
//   console.log(1, error.msg);
// })