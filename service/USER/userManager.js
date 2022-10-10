import * as firebase from "../../config/firebase-config.js";
import {getDatabase} from "firebase-admin/database";
import {channel} from "../../domain/CHANNEL/channel.js";
import * as index from "../../domain/USER/index.js";

const db = getDatabase();
const channelRef = db.ref('channel');

class userManager {
    createAdmin(){

    }
    
    createPlayer(){

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
    let ret = [];
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

// CM.getChannelById(CM.createChannel("alalal", 4,0).id).then((channel)=>{
//   console.log(channel["room"][0]["gameboard"]);
// }).catch((error)=>{
//   console.log(1, error.msg);
// })