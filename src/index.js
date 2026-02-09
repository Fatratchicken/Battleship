import "./style.css";

import { Player } from "./player";
import { Gameloop } from "./game-loop";
import { DomBoard } from "./dom-board";
import { TextBar } from "./text-bar";
import { SwapScreen } from "./swapScreen";

import CONFIG from "./game-config";

//setup
const player = new Player(CONFIG.PLAYER_1);
const computer = new Player(CONFIG.PLAYER_2);

const interactiveBoard = new DomBoard('interactive-board');
const staticBoard = new DomBoard('static-board');

const textBar = new TextBar('text-bar');
const swapScreen = new SwapScreen('player-swap-dialog', 'player-swap-title');

const gameloop = new Gameloop(player, computer, interactiveBoard, staticBoard, textBar, swapScreen);

gameloop.setup();
gameloop.run();