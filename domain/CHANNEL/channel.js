import { room } from "./room.js";

export class channel {
    constructor(id, name, maxRoom, maxTeam){ 
        this.id=id;
        this.name=name;
        this.maxRoom=maxRoom;
        this.maxTeam=maxTeam;
        this.initRoom();
    }

    //clear room
    initRoom(){
        this.room = [];

        for(let i=0;i<this.maxRoom;i++)
            this.room[i] = new room(this.maxTeam);            
    }
}