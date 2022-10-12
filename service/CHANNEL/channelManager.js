import {getDatabase} from "firebase-admin/database";
import {channel} from "../../domain/CHANNEL/channel.js";

const db = getDatabase();
const channelRef = db.ref('channel');
const adminRef = db.ref('user/admin');

class channelManager {
  createChannel(name, maxRoom, maxTeam, adminId){ //firebase에서 channel 저장, id는 firebase에서 만들어준 id사용
    const newPostRef = channelRef.push();
    newPostRef.set({
      name:name,
      maxRoom:maxRoom,
      maxTeam:maxTeam
    });

    //todo: gameManage firebase에 추가
    //todo: group으로 나눠서 channel 생성

    adminRef.child(`/${adminId}/channel`).push().set({channelId:newPostRef.key});

    return new channel(newPostRef.key, name, maxRoom, maxTeam);
  }

  getChannelById(channelId){ //firebase에서 id로 channel 가져오기
    return new Promise((resolve, reject)=>{
      channelRef.child(`/${channelId}`).on('value', (snapshot)=>  {
        resolve(snapshot.val());

        // const snapVal = snapshot.val();

        // Object.keys(snapVal).forEach((cid)=>{
        //   if(cid==channelId)
        //     resolve(new channel(cid, snapVal[cid]["name"], snapVal[cid]["maxRoom"], snapVal[cid]["maxTeam"]));
        // })

        // reject(new Error());

      }, (errorObject)=>{
        console.log('The read failed: ' + errorObject.name);
        reject(new Error());
      })
    })
  }

  getChannelByName(channelName){ //firebase에서 name으로 channel 가져오기

  }

  getChannels(adminId){ // admin이 관리하는 channel들 가져오기
    return new Promise((resolve, reject)=>{
      adminRef.child(`/${adminId}/channel`).on('value', async (snapshot)=>{
        let ret = [];
        let cids = snapshot.val();

        for(let idx in cids){
          ret.push(await CM.getChannelById(cids[idx]["channelId"]));
        }

        resolve(ret);
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