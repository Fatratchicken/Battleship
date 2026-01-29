import "./style.css";

import { Player } from "./player";
import { Gameloop } from "./dom-actions";

// MAKE SURE TO CHANGE OPPONENT BOARD NAME TO INTERACTIVE BOARD, AND CURRENT-BOARD TO STATIC-BOARD

//setup
const player = new Player('human', 'current-board');
const computer = new Player('computer', 'opponent-board');

player.domBoard.initRender();
computer.domBoard.initRender();

// placement
player.gameboard.placeRandom();
computer.gameboard.placeRandom();

player.domBoard.renderAllShips();

// gameplay:
const gameLoop = new Gameloop(player, computer, 'opponent-board');

gameLoop.init();

