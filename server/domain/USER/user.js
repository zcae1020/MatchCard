import {currentLocation} from './currentLocation.js'
import {getDatabase} from "firebase-admin/database";

class user{
    constructor(uid, id, password, name, groupId){ 
        this.uid = uid;
        this.id=id;
        this.password=password;
        this.name=name;
        this.groupId=groupId;
        this.currentLocation= new currentLocation();
    }

    getCurrentLocation() {
        return new Promise((resolve, reject) => {
            
        })
    }
}

export default user;