import user from "./user.js";

class player extends user {
    constructor(uid, id, password, name, groupId) {
        super(uid, id, password, name, groupId);
        this.win = 0;
        this.loss = 0;
        this.draw = 0;
    }
}

export default player;
