import "./style.css";

import { Player } from "./player";
import { Gameloop } from "./game-loop";
import { DomBoard } from "./dom-board";
import { TextBar } from "./text-bar";

//setup
const player = new Player('human');
const computer = new Player('computer');

const interactiveBoard = new DomBoard('interactive-board');
const staticBoard = new DomBoard('static-board');

const textBar = new TextBar('text-bar');


const gameloop = new Gameloop(player, computer, interactiveBoard, staticBoard, textBar);

gameloop.setup();
gameloop.run();