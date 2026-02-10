import CONFIG from "./game-config";

class smartAttack{
    constructor(){
        this.openIndexes = this.#matrixToSet();
        this.nextIndexes = [];        
    }

    #matrixToSet(){
        let set = new Set();

        for (let y = 0; y < CONFIG.BOARD_HEIGHT; y++){
            for (let x = 0; x < CONFIG.BOARD_WIDTH; x++){
                set.add(`[${x},${y}]`);
            }
        }

        return set;
    }

    #findTargets(index){
        this.nextIndexes = [];

        for (let i = -1; i < 2; i+= 2){
            const index_x = [index[0] + i, index[1]];
            const index_y = [index[0], index[1] + i];

            if (this.openIndexes.has(`[${index_x[0]},${index_x[1]}]`)) this.nextIndexes.push(index_x);
            if (this.openIndexes.has(`[${index_y[0]},${index_y[1]}]`)) this.nextIndexes.push(index_y);
        }
    }

    #target(opponentBoard){
        let index = this.nextIndexes.pop();

        const result = opponentBoard.receiveAttack(index[0], index[1]);
        this.openIndexes.delete(`[${index[0]},${index[1]}]`);

        if (result === 'hit'){this.#findTargets(index)}

        return result;
    }
    

    attack(opponentBoard){
        let result;

        if (this.nextIndexes.length > 0) result = this.#target(opponentBoard);

        else{
            const items = Array.from(this.openIndexes);

            const randomAttack = Math.floor(Math.random() * (this.openIndexes.size));

            const index = JSON.parse(items.splice(randomAttack, 1)[0]);
            this.openIndexes.delete(`[${index[0]},${index[1]}]`);

            result = opponentBoard.receiveAttack(index[0], index[1]);

            if (result === 'hit') this.#findTargets(index);
        }

        return result;
    }
}

export default smartAttack;