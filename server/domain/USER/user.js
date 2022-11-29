import {currentLocation} from './currentLocation.js'

class user{
    constructor(uid, id, password, name, groupId){ 
        this.uid = uid;
        this.id=id;
        this.password=password;
        this.name=name;
        this.groupId=groupId;
        this.currentLocation= new currentLocation();
    }
}

export default user;