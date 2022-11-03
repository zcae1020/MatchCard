import users from './user.js'

class admin extends users{
    constructor(uid, id, password, name){
        super(uid, id, password, name)
    }
}

export default admin