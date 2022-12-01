function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //최댓값은 제외, 최솟값은 포함
}

export class gameBoard{
    //time = 2 // 1인당 제한시간 2초
    row = 4
    col = 8
    cards = [] //4x8 카드 묶음

    constructor(){

        /*this.cards = [
            [0,0,1,1,2,2,3,3],
            [4,4,5,5,6,6,7,7],
            [8,8,9,9,10,10,11,11],
            [12,12,13,13,14,14,15,15]
        ];*/


        this.generateCards(this.row, this.col);
    }

    generateCards(row, col){
        let cardNum=  row*col;
        let cid = [];

        for(let i=0;i<cardNum/2;i++){
            cid.push(i);
            cid.push(i);
        }

        for(let i=0;i<row;i++){
            let a=[];

            for(let j=0;j<col;j++){
                let num = getRandomInt(0,cid.length);
                a.push(cid[num]);
                cid.splice(num, 1);
            }
             
            this.cards.push(a);
        }
    }
}