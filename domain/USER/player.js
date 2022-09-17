import user from './user.js'

class player extends user{
    constructor(id, password, name){ 
        super(id, password, name)
        this.win=0
        this.loss=0
        this.draw=0
        this.channelId=''
        this.roomId=''
        this.team=-1
    }
}

export default player;