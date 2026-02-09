const actions = {

    randomPlace(gameboard){
        // brute force
        const boolArr = [true, false];

        for(let [ship, _] of gameboard.ships){
            const vertical = boolArr[Math.floor(Math.random() * 2)];

            const max_x = (vertical) ? gameboard.width - 1 : gameboard.width - ship.length;
            const max_y = (vertical) ? gameboard.height - ship.length : gameboard.height - 1;

            let placed = false;

            while (!placed){
                const x = Math.floor(Math.random() * (max_x + 1));
                const y = Math.floor(Math.random() * (max_y + 1));

                try {
                    gameboard.placeShip(ship, x, y, vertical);
                    placed = true;
                } catch (e) {e}
            }            
        }
    }
    
}

export default actions;