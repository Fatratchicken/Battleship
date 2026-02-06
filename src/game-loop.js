class Gameloop{
    constructor(player_1, player_2, interactive_board, static_board, textBar){
        this.player_1 = player_1;
        this.player_2 = player_2;

        this.turnArr = [this.player_1, this.player_2];
        this.playerTextArr = ['P1', 'P2'];

        this.turn = 0;

        // current attacker
        this.currentPlayer = this.turnArr[this.turn];
        this.currentPlayerText = this.playerTextArr[this.turn];

        this.otherPlayer = this.turnArr[(this.turn + 1) % 2];

        this.static_board = static_board;
        this.interactive_board = interactive_board;

        this.textBar = textBar;
    }

    setup(){
        this.player_1.gameboard.placeRandom();
        this.player_2.gameboard.placeRandom();

        this.#renderBoards();
        this.textBar.renderPlayer(this.currentPlayerText);
    }

    run(){
        this.#eventGame();
    }

    handleEvent(event){
        if (this.currentPlayer.type !== 'human') return;
        
        const target = event.target;

        if (target.classList.contains('empty-tile')){
            const index = JSON.parse(target.dataset.index);

            const win = this.#domTurn(index);

            if (win) return;

            if (this.currentPlayer.type === 'computer') this.#automaticTurn();
            else this.#renderBoards();
        }      
    }


    #eventGame(){
        if (this.currentPlayer.type === 'computer') this.#automaticTurn();

        this.interactive_board.htmlContainer.addEventListener('click', this);
    }

    #renderBoards(){
        this.interactive_board.render(this.otherPlayer.gameboard, false);
        this.static_board.render(this.currentPlayer.gameboard);
    }

    #domTurn(index){
        const result = this.otherPlayer.gameboard.receiveAttack(index[1], index[0]);
        this.interactive_board.render(this.otherPlayer.gameboard, false);

        const win = this.#checkWin(result);

        if (win) return true;

        this.#swapTurn();

        return result;
    }

    #automaticTurn(){      
        setTimeout(() => {
            const result = this.otherPlayer.gameboard.randomAttack();
            this.static_board.render(this.otherPlayer.gameboard);

            const win = this.#checkWin(result);

            if (win) return true;

            this.#swapTurn();

            return result;
        }, 1000)        

    }

    #swapTurn(){
        this.turn = (this.turn + 1) % 2;

        this.currentPlayer = this.turnArr[this.turn];
        this.otherPlayer = this.turnArr[(this.turn + 1) % 2];

        this.currentPlayerText = this.playerTextArr[this.turn];

        this.textBar.renderPlayer(this.currentPlayerText)
    }

    #checkWin(result){
        if (result === 'loss'){
            this.interactive_board.htmlContainer.removeEventListener('click', this);
            this.textBar.renderWinner(this.currentPlayerText);

            return true;
        }
    }
}

export {Gameloop}
