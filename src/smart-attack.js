import CONFIG from "./game-config";

class smartAttack{
    constructor(){
        this.openIndexes = this.#matrixToArr();
        
    }

    #matrixToArr(){
        let arr = [];

        for (let y = 0; y < CONFIG.BOARD_HEIGHT; y++){
            for (let x = 0; x < CONFIG.BOARD_WIDTH; x++){
                arr.push([y,x]);
            }
        }

        return arr;
    }

    attack(opponentBoard){
        const randomAttack = Math.floor(Math.random() * (this.openIndexes.length));

        const index = this.openIndexes.splice(randomAttack, 1)[0];

        return opponentBoard.receiveAttack(index[1], index[0]);
    }
}

export default smartAttack;