import { Gameboard } from "./gameboard";
import smartAttack from "./smart-attack";

class Player{
    constructor(type){
        this.type = type;
        this.gameboard = new Gameboard();

        if (type === 'computer') this.smartAttack = new smartAttack();
    }
}

export {Player}