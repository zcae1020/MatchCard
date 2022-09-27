import { gameBoard } from "../GAME/gameBoard";
import { team } from "./team";

export class room{
    gameboard = new gameBoard();

    constructor(id, maxTeam){
        this.id=id;
        this.state=0; //0: ready, 1: play
        this.userCnt=0; //user 수
        this.initTeam(maxTeam) // class team
    }

    //clear team
    initTeam(maxTeam){
        this.team = [];

        for(i=0;i<maxTeam;i++){
            this.team[i] = new team(i);            
        }
    }
}