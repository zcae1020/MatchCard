import { gameBoard } from "../GAME/gameBoard.js";
import { team } from "./team.js";

export class room{
    constructor(id, maxTeam){
        this.id=id;
        this.state=0; //0: ready, 1: play
        this.userCnt=0; //user 수
        this.gameboard = new gameBoard(maxTeam);
        this.initTeam(maxTeam) // class team
    }

    //clear team
    initTeam(maxTeam){
        this.team = [];

        for(let i=0;i<maxTeam;i++){
            this.team[i] = new team(i);            
        }
    }
}