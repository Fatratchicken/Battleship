// rename to game-round
class Gameloop{
    constructor(player_1, player_2, interactive_board, static_board){
        this.player_1 = player_1;
        this.player_2 = player_2;

        this.turnArr = [this.player_1, this.player_2];
        this.turn = 0;

        // current attacker
        this.currentPlayer = this.turnArr[this.turn];
        this.otherPlayer = this.turnArr[(this.turn + 1) % 2];

        this.static_board = static_board;
        this.interactive_board = interactive_board;
    }

    setup(){
        this.player_1.gameboard.placeRandom();
        this.player_2.gameboard.placeRandom();
    }

    run(){
        this.interactive_board.render(this.otherPlayer.gameboard, false);
        this.static_board.render(this.currentPlayer.gameboard);

        this.interactive_board.htmlContainer.addEventListener('click', (event) => {
            const target = event.target;

            if (target.classList.contains('empty-tile')){
                const index = JSON.parse(target.dataset.index);

                const result = this.otherPlayer.gameboard.receiveAttack(index[1], index[0]);
                this.interactive_board.render(this.otherPlayer.gameboard, false);

                if (result === 'loss'){
                    alert('You Win');
                }

                const computer_result = this.currentPlayer.gameboard.randomAttack();
                this.static_board.render(this.currentPlayer.gameboard);
                if (computer_result === 'loss'){
                    alert('You Lose');
                }
            }   
        })

    }

}

export {Gameloop}
