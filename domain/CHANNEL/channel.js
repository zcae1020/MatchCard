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
        this.rooms = [];

        for(let i=0;i<this.maxRoom;i++)
            this.rooms[i] = new room(this.maxTeam);            
    }
}