import "./style.css";

import { Player } from "./player";

//setup
const player = new Player('human', 'current-board');
const computer = new Player('computer', 'opponent-board');

player.domBoard.initRender();
computer.domBoard.initRender();

// placement
player.gameboard.placeRandom();
computer.gameboard.placeRandom();
