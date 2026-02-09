import CONFIG from "./game-config";
import { Ship } from "./ship"

class Gameboard{
    constructor(){
        this.width = CONFIG.BOARD_WIDTH;
        this.height = CONFIG.BOARD_HEIGHT;

        this.ships = new Map(CONFIG.SHIPS.map(length => [new Ship(length), []]));
        this.shipCount = CONFIG.SHIPS.length;

        this.board = Array.from(Array(this.height), () => Array(this.width).fill(null)); 
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

    allSunk(){
        return (this.shipCount > 0) ? false : true;
    }
}

export {Gameboard}

