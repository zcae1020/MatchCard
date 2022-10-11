import { gameBoard } from "../../domain/GAME/gameBoard";

export class gameManager{
    coupledCards = [] // 짝 맞춰진 카드 id
    cardsState = [] // 0: 짝이 안맞춰짐, 1: 짝이 맞춰짐
    
    pick = [] //현재 턴을 가진 team에서 뽑은 카드 위치, 2개가 뽑히면 짝이 맞는지 안맞는지 판별 후 리턴
    teamTurn = 0 // 현재 턴을 가진 team num
    userTurn = 0 // 현재 턴을 가진 team 중 턴을 가진 팀원 순서
    teamscore = [] //팀별 점수
    teams = []; //게임 시작후 확정된 team
    maxTeam;

    constructor(maxTeam){
        maxTeam = maxTeam;
        this.gameBoard = new gameBoard();

        for(let i=0;i<maxTeam;i++)
            this.teamscore.push(0);

        for(let i=0;i<this.gameBoard.row;i++){
            let a=[];
            for(let j=0;j<this.gameBoard.col;j++){
                a.push(0);
            }
            this.cardsState.push(a);
        }

        this.initTeam();
    }

    /**
     * 
     * @param {team[]} teams 
     */
    gameStart(teams){
        this.teams = teams;       
    }

    nextTeam(){
        this.userTurn = 0;
        this.teamTurn = (this.teamTurn+1)%this.maxTeam;
    }

    nextUser(team){
        this.userTurn = (this.userTurn+1)%team.length;
    }

    //return: -1: no compare, 0: no match, 1: match
    isMatch(point){
        this.pick.push(point);

        if(this.pick.length==2){
            let p1x = pick[0][0], p1y = pick[0][1], p2x = pick[1][0], p2y = pick[1][1];

            pick = [];
            if(this.gameBoard.cards[p1x][p1y]==this.gameBoard.cards[p2x][p2y]){
                this.teamscore[this.teamTurn]++;
                return 1;
            }
            else return 0;
        }

        return -1;
    }
}