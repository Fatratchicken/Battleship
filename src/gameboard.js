import CONFIG from "./game-config";
import { Ship } from "./ship"

class Gameboard{
    constructor(){
        this.width = CONFIG.BOARD_WIDTH;
        this.height = CONFIG.BOARD_HEIGHT;

        this.ships = new Map(CONFIG.SHIPS.map(length => [new Ship(length), []]));
        this.shipCount = CONFIG.SHIPS.length;

        // for quick overlap checks O(1)
        this.board = Array.from(Array(this.height), () => Array(this.width).fill(null));
        
        // for random attacks:
        this.openIndexes = this.#matrixToArr(this.width, this.height);
    }

    #matrixToArr(width, height){
        let arr = [];

        for (let y = 0; y < height; y++){
            for(let x = 0; x < width; x++){
                arr.push([y, x]);
            }
        }

        return arr;
    }

    placeShip(ship, x, y, vertical){
        const length = ship.length;

        if (x >  this.width - 1  || y > this.height - 1){
            throw new Error('index out of board range');
        }

        if (x + length > this.width && !vertical || y + length > this.height && vertical){
            throw new Error('length out of range');
        }

        let indexes = [];
        let startIndex = (vertical) ? y : x;

        for (let index = startIndex, i = 0; i < length; i++, index++){
            const currentIndex = (vertical) ? [index, x] : [y, index];

            if (this.board[currentIndex[0]][currentIndex[1]] !== null) throw new Error('ship overlap');
            
            indexes.push(currentIndex);
        }

        indexes.forEach(([y,x]) => {
            this.board[y][x] = ship;
        });

        this.ships.set(ship, indexes);
    }
    
    // brute force
    placeRandom(){
        const boolArr = [true, false];

        for(let [ship, _] of this.ships){
            const vertical = boolArr[Math.floor(Math.random() * 2)];

            const max_x = (vertical) ? this.width - 1 : this.width - ship.length;
            const max_y = (vertical) ? this.height - ship.length : this.height - 1;

            let placed = false;

            while (!placed){
                const x = Math.floor(Math.random() * (max_x + 1));
                const y = Math.floor(Math.random() * (max_y + 1));

                try {
                    this.placeShip(ship, x, y, vertical);
                    placed = true;
                } catch (e) {e}
            }            
        }
    }

    receiveAttack(x,y){
        const indexValue = this.board[y][x];

        if (indexValue === 'X' || indexValue === 'O') throw new Error('index previously chosen');

        else if (typeof indexValue === 'object' && indexValue !== null){
            indexValue.hit();

            if(indexValue.isSunk()){
                this.shipCount--; 
                this.ships.get(indexValue).forEach(([y, x]) => this.board[y][x] = 'S');

                if (this.allSunk() === true){
                    return 'loss';
                }
            }

            else{
                this.board[y][x] = 'X';
            }
        }
        
        else{
            this.board[y][x] = 'O';
        } 
    }

    // smart attack AI:
    randomAttack(){
        const randomIndex = Math.floor(Math.random() * (this.openIndexes.length));

        const index = this.openIndexes.splice(randomIndex, 1)[0];
        return this.receiveAttack(index[1], index[0]);
    }

    allSunk(){
        return (this.shipCount > 0) ? false : true;
    }
}

export {Gameboard}

