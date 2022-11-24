import { room } from "./room.js";

export class channel {
    constructor(id, maxRoom, maxTeam, groupId){ 
        this.id=id;
        this.maxRoom=maxRoom;
        this.maxTeam=maxTeam;
        this.groupId=groupId;
        this.conn=[];
        this.initRoom();
    }

    //clear room
    initRoom(){
        this.rooms = [];

        for(let i=0;i<this.maxRoom;i++)
            this.rooms[i] = new room(i, this.maxTeam);            
    }
}