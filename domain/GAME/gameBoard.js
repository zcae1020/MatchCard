function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //최댓값은 제외, 최솟값은 포함
}

export class gameBoard{
    time = 2 // 1인당 제한시간 2초
    cardNum = 32
    cards = [] //4x8 카드 묶음
    turn = 0 // 현재 턴을 가진 team num
    teamscore = [] //팀별 점수

    constructor(){
        this.generateCards(4,8);
    }

    constructor(time, cardNum){
        this.time = time;
        this.cardNum = cardNum;

        this.generateCards(4,8);
    }

    generateCards(row, col){
        let cid = [];

        for(i=0;i<this.cardNum;i++){
            cid.push(i);
            cid.push(i);
        }

        for(i=0;i<row;i++){
            let a=[];

            for(j=0;j<col;j++){
                let num = getRandomInt(0,cid.length);
                cid.splice(num, 1);
                a.push(cid[num]);
            }
             
            this.cards.push(a);
        }
    }
}