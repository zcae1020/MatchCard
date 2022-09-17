import users from './user.js'

class admin extends users{
    constructor(id, password, name){
        super(id, password, name)
        this.ChannelId = ''
    }
}

export default admin