import { Ship } from "./ship"

class Gameboard{
    constructor(){
        this.width = 10;
        this.height = 10;

        this.ships = [5,4,3,3,2].map(length => new Ship(length));
        this.shipCount = this.ships.length;

        // for quick overlap checks O(1)
        this.board = Array.from(Array(this.height), () => Array(this.width).fill(null));

        // for quicker board rendring, O(number of hit / ships index) vs O(n^2)
        this.shipIndexes = [];
        this.hitIndexes = new Map();

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

        this.shipIndexes.push(indexes);
    }

    receiveAttack(x,y){
        const indexValue = this.board[y][x];

        if (indexValue === 'X' || indexValue === 'O') throw new Error('index previously chosen');

        else if (typeof indexValue === 'object' && indexValue !== null){
            indexValue.hit();

            if(indexValue.isSunk()) this.shipCount--;

            this.board[y][x] = 'X';
            this.hitIndexes.set([y,x], 'hit');

            return 'hit';
        }
        
        else{
            this.board[y][x] = 'O';
            this.hitIndexes.set([y,x], 'miss');

            return 'miss';
        } 
    }

    allSunk(){
        return (this.shipCount > 0) ? false : true;
    }
}

export {Gameboard}

