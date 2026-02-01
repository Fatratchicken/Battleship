class TextBar{
    constructor(containerId){
        this.htmlContainer = document.getElementById(containerId);
    }

    renderPlayer(player){
        this.htmlContainer.innerHTML = '';

        this.htmlContainer.textContent = `Current player: (${player})`;
    }

    renderWinner(winner){
        this.htmlContainer.innerHTML = '';

        this.htmlContainer.textContent = `Player (${winner}) is the Winner!`;
    }
}

export {TextBar}