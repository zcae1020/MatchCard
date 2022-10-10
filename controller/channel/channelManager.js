import * as firebase from "../../config/firebase-config.js";
import {getDatabase} from "firebase-admin/database";
import {channel} from "../../domain/CHANNEL/channel.js";
import { gameBoard } from "../../domain/GAME/gameBoard.js";

// Get a database reference to our blog
const db = getDatabase();
const channelRef = db.ref('channel');

class channelManager {
  createChannel(name, maxRoom, maxTeam){ //firebase에서 channel 저장, id는 firebase에서 만들어준 id사용
    const newPostRef = channelRef.push();
    newPostRef.set({
      name:name,
      maxRoom:maxRoom,
      maxTeam:maxTeam
    });
    return new channel(newPostRef.key, name, maxRoom, maxTeam);
  }

  async getChannelById(channelId){ //firebase에서 id로 channel 가져오기
    return new Promise((resolve, reject)=>{
      channelRef.on('value', (snapshot)=>  {
        const snapVal = snapshot.val();

        Object.keys(snapVal).forEach((cid)=>{
          if(cid==channelId)
            resolve(new channel(cid, snapVal[cid]["name"], snapVal[cid]["maxRoom"], snapVal[cid]["maxTeam"]));
        })

        reject(new Error());

      }, (errorObject)=>{
        console.log('The read failed: ' + errorObject.name);
        reject(new Error());
      })
    })
  }

  getChannelByName(channelName){ //firebase에서 name으로 channel 가져오기

  }

  getChannels(adminId){

  }

  deleteChannelById(channelId){ //firebase에서 id로 channel 지우기

  }

  deleteChannelByName(channelName){ //firebase에서 name로 channel 지우기

  }

  createRooms(room, team){

  }

  deleteRooms(){

  }
}

export const CM = new channelManager();

CM.getChannelById(CM.createChannel("alalal", 4,0).id).then((channel)=>{
  console.log(channel["room"][0]["gameboard"]);
}).catch((error)=>{
  console.log(1, error.msg);
})