import "./style.css";

import { Player } from "./player";

//setup
const player = new Player('human', 'current-board');
const computer = new Player('computer', 'opponent-board');

player.domBoard.initRender();
computer.domBoard.initRender();

const turnArr = [player, computer];
let turn = 0;

// placement
while (turn < 2){
    let count = 0;
    let currentPlayer = turnArr[turn];

    for (let ship of currentPlayer.gameboard.ships){
        currentPlayer.gameboard.placeShip(ship, 0, count, false);

        if (currentPlayer === player){
            currentPlayer.domBoard.renderShip();
        }

        count++;
    }   

    turn++;
}

// main gameplay: 
turn = 0;

computer.gameboard.receiveAttack(1,1);
computer.domBoard.renderAttack();

computer.gameboard.receiveAttack(9,9);
computer.domBoard.renderAttack()


// create players

// place ships - function in seperate module.

// start a loop until someone wins / loses
// current player chooses a coordinate
// display board (both current player and other player, other player board without boats) - function in seperate module
// check if hit, check wins - function in seperate bodule.
// swap player

// display winner
