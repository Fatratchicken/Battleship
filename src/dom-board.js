class DomBoard{
    constructor(gameboard, conatinerId){
        this.board = gameboard;
        this.conatinerId = conatinerId;

        this.width = this.board.width;
        this.height = this.board.height;
    }

    initRender(){
        const htmlContainer = document.getElementById(this.conatinerId);

        htmlContainer.style.gridTemplate = 'repeat(10, 1fr) / repeat(10, 1fr)';

        for (let y = 0; y < this.height; y++){
            for (let x = 0; x < this.width; x++){
                const newTile = document.createElement('div');
                newTile.dataset.index = JSON.stringify([y,x]);

                newTile.classList.add('empty-tile');
                htmlContainer.appendChild(newTile);
            }
        }
    }

    renderAttack(){
        const index = [...this.board.hitIndexes.keys()].at(-1);
        const value = this.board.hitIndexes.get(index);

        const domTile = document.querySelector(`#${this.conatinerId} [data-index="[${[index[0], index[1]]}]`);


        if (value === 'hit'){
            domTile.textContent = 'hit';
        }

        else{
            domTile.textContent = 'miss';
        }
    }
    
    renderShip(){
        const indexes = this.board.shipIndexes.at(-1);

        for (let index of indexes){
            const  domTile = document.querySelector(`#${this.conatinerId} [data-index="[${index[0]},${index[1]}]"]`);

            domTile.textContent = 'ship';
        }
    }

    renderAllShips(){
        const indexes = this.board.shipIndexes;

        for (let ship of indexes){
            for (let index of ship){
                const domTile = document.querySelector(`#${this.conatinerId} [data-index="[${index[0]},${index[1]}]"]`);

                domTile.style.backgroundColor = 'gray';
            }
        }
    }
}


export {DomBoard}