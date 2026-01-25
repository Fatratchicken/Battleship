import "./style.css";

import { Player } from "./player";

// 1. setup:
const playerContainerId = 'current-board';
const opponentContainerId = 'opponent-board';

const player = new Player('human');
const computer = new Player('computer');

player.domBoard.initRender(playerContainerId);
computer.domBoard.initRender(opponentContainerId);

const turnArr = [player, computer];
let turn = 0;

// placement for ships (Ineffective random, fix later)

while (turn < 2){
    let count = 0;
    let currentPlayer = turnArr[turn];

    for (let ship of currentPlayer.gameboard.ships){
        currentPlayer.gameboard.placeShip(ship, 0, count, false);

        if (currentPlayer === player){
            currentPlayer.domBoard.renderShip(playerContainerId);
        }

        count++;
    }   

    turn++;
}

// main gameplay: 
turn = 0;

computer.gameboard.receiveAttack(1,1);
computer.domBoard.renderAttack('opponent-board');

computer.gameboard.receiveAttack(9,9);
computer.domBoard.renderAttack('opponent-board')


// create players

// place ships - function in seperate module.

// start a loop until someone wins / loses
// current player chooses a coordinate
// display board (both current player and other player, other player board without boats) - function in seperate module
// check if hit, check wins - function in seperate bodule.
// swap player

// display winner
