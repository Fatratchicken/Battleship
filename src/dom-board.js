import CONFIG from "./game-config";

class DomBoard{
    constructor(containerId){
        this.width = CONFIG.BOARD_WIDTH;
        this.height = CONFIG.BOARD_HEIGHT;

        this.containerId = containerId;
        this.htmlContainer = document.getElementById(this.containerId);
    }

    render(gameboard, ships =  true){
        // delete previous display:
        this.htmlContainer.innerHTML = '';
        this.htmlContainer.style.gridTemplate = `repeat(${this.width}, 1fr) / repeat(${this.height}, 1fr)`;

        const matrix = gameboard.board;

        for (let y = 0; y < this.height; y++){
            for (let x = 0; x < this.width; x++){
                const newTile = document.createElement('div');
                newTile.dataset.index = JSON.stringify([y,x]);

                switch (matrix[y][x]) {
                    case null:
                        newTile.classList.add('empty-tile');
                        break;
                    
                    case 'X':
                        newTile.classList.add('hit')
                        break;

                    case 'O':
                        newTile.classList.add('miss');
                        break;

                    default:
                        if (ships) newTile.classList.add('ship');
                        else newTile.classList.add('empty-tile');
                        break;
                }
                
                this.htmlContainer.appendChild(newTile);
            }
        }
    }
}


export {DomBoard}