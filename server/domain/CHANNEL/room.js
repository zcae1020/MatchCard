import { gameManager } from "../GAME/gameManager.js";
import { team } from "./team.js";

export class room{
    constructor(roomId, maxTeam){
        this.roomId=roomId;
        this.state=0; //0: ready, 1: play
        this.userCnt=0; //user 수
        this.maxTeam = maxTeam;
        this.initTeam();
        this.gameManager = new gameManager(maxTeam);
    }

    //clear team
    initTeam(){
        this.teams = [];

        for(let i=0;i<this.maxTeam;i++)
            this.teams[i] = new team(i);
    }
}