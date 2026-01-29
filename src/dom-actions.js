class Gameloop{
    constructor(player_1, player_2, containerId){
        this.player_1 = player_1;
        this.player_2 = player_2;

        this.turnArr = [this.player_1, this.player_2];
        this.turn = 0;

        // current attacker
        this.currentPlayer = this.turnArr[this.turn];
        this.otherPlayer = this.turnArr[(this.turn + 1) % 2];

        // current boards being attacked
        this.currentboard = this.otherPlayer.gameboard;
        this.currentDomBoard = this.otherPlayer.domBoard;

        this.htmlContainer = document.getElementById(containerId);
    }

    swapPlayer(){
        this.turn += 1;

        this.currentPlayer = this.turnArr[this.turn % 2];
        this.otherPlayer = this.turnArr[(this.turn + 1) % 2];

        this.currentboard = this.otherPlayer.gameboard;
        this.currentDomBoard = this.otherPlayer.domBoard;
    }

    domTurn(target){
        try{
            const index = JSON.parse(target.dataset.index);
            this.currentboard.receiveAttack(index[1], index[0]);
            this.currentDomBoard.renderAttack(); 

            this.swapPlayer();
        }
        
        catch(error){
            alert(error);
        }
    }

    automaticTurn(){
        this.currentboard.randomAttack(); 
        this.currentDomBoard.renderAttack();

        this.swapPlayer();
    }

    init(){
        if (this.currentPlayer.type === 'computer') this.automaticTurn();
        
        this.htmlContainer.addEventListener('click', (event) => {
            const target = event.target;

            if (target.classList.contains('empty-tile')){
                this.domTurn(target);

                if (this.currentPlayer.type === 'computer') this.automaticTurn();
            }
        })
    }
}

export {Gameloop}
