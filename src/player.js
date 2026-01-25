import { DomBoard } from "./dom-board";
import { Gameboard } from "./gameboard";

class Player{
    constructor(type){
        this.type = type;
        this.gameboard = new Gameboard();
        this.domBoard = new DomBoard(this.gameboard);
    }
}

export {Player}