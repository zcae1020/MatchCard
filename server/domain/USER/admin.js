import users from "./user.js";

class admin extends users {
    constructor(uid, id, password, name, groupId) {
        super(uid, id, password, name, groupId);
    }
}

export default admin;
