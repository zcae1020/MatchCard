import { gameBoard } from "../GAME/gameBoard.js";
import { team } from "./team.js";

export class room{
    constructor(maxTeam){
        this.state=0; //0: ready, 1: play
        this.userCnt=0; //user 수
        this.maxTeam = maxTeam;
        this.gameboard = new gameBoard(maxTeam);
        this.initTeam() // class team
    }

    //clear team
    initTeam(){
        this.team = [];

        for(let i=0;i<this.maxTeam;i++)
            this.team[i] = new team();         
    }
}