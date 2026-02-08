class SwapScreen{
    constructor(containerId, titleId){
        this.htmlContainer = document.getElementById(containerId);
        this.title = document.getElementById(titleId);
    }

    render(playerText){
        this.title.textContent = `Hand computer to Player (${playerText})`;
        this.htmlContainer.showModal();

        this.htmlContainer.addEventListener('click', () => this.htmlContainer.close());
    }
}

export {SwapScreen}