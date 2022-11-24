import { gameManager } from "../GAME/gameManager.js";
import { team } from "./team.js";

export class room{
    constructor(roomId, maxTeam){
        this.roomId=roomId;
        this.state=0; //0: ready, 1: play
        this.userCnt=0; //user 수
        this.maxTeam = maxTeam;
        this.conn=[];
        this.initTeam();
        this.gameManager = new gameManager(maxTeam);
    }

    //clear team
    initTeam(){
        this.teams = [];

        for(let i=0;i<this.maxTeam;i++)
            this.teams[i] = new team(i);
    }

    //user visit room
    visitRoom(){
        findOptimalTeam();
    }

    startGame(){

    }

    //return: 팀원수를 맞추기 위해 들어가야할 팀, 인원이 다 똑같다면 팀 num 작은순
    findOptimalTeam(){

    }

    moveTeam(){

    }
}