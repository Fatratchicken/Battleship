import { DomBoard } from "./dom-board";
import { Gameboard } from "./gameboard";

class Player{
    constructor(type, conatinerId){
        this.type = type;
        this.gameboard = new Gameboard();
        this.domBoard = new DomBoard(this.gameboard, conatinerId);
    }
}

export {Player}