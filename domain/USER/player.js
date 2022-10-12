import user from './user.js'

class player extends user{
    constructor(uid, id, password, name){ 
        super(uid, id, password, name)
        this.win=0
        this.loss=0
        this.draw=0
    }
}

export default player;