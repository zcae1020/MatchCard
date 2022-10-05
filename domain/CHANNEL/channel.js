import { room } from "./room.js";

export class channel {
    constructor(id, name, maxRoom, maxTeam){ 
        this.id=id;
        this.name=name;
        this.initRoom(maxRoom, maxTeam);
    }

    //clear room
    initRoom(maxRoom, maxTeam){
        this.room = [];

        for(let i=0;i<maxRoom;i++){
            this.room[i] = new room(i, maxTeam);            
        }
    }
}