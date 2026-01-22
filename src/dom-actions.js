class DomBoard{
    constructor(player, htmlContainer){
        this.htmlContainer = htmlContainer;

        this.player = player;
        this.board = this.player.gameboard;

        this.width = this.board.width;
        this.height = this.board.height;
    }

    initRender(){
        this.htmlContainer.style.gridTemplate = 'repeat(10, 1fr) / repeat(10, 1fr)';

        for (let i = 0; i < this.width * this.height; i++){
            const newTile = document.createElement('div');

            newTile.classList.add('empty-tile');
            this.htmlContainer.appendChild(newTile);
        }
    }
}

export {DomBoard}




// class OpponentBoard extends DomBoard{
//     constructor(player, htmlContainer){
//         super(player, htmlContainer);
//     }
// }

// class CurrentBoard extends DomBoard{
//     constructor(){
//         this.htmlContainer = document.getElementById('');
//     }
// }