import users from './users.js'

class user extends users{
    constructor(id, password, name){ 
        super(id, password, name)
        this.win=0
        this.loss=0
        this.draw=0
    }
}

export default user;