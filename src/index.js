import "./style.css";

import { Player } from "./player";
import { Gameloop } from "./game-loop";
import { DomBoard } from "./dom-board";

//setup
const player = new Player('human');
const computer = new Player('computer');

const interactiveBoard = new DomBoard('interactive-board');
const staticBoard = new DomBoard('static-board');


const gameloop = new Gameloop(player, computer, interactiveBoard, staticBoard);

gameloop.setup();
gameloop.run();