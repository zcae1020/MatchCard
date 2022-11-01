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

  getGroupByUid(uid){
    
  }

  getGroupByChannelId(channelId){

  }

  getGroupByName(name){
    
  }

  deleteGroupByGroupId(groupId){

  }
}

export const GM = new groupManager();