class Ship{
    constructor(length = 0, hitCount = 0, sunk = false){
        this.length = length;
        this.hitCount = hitCount;
        this.sunk = !!sunk;
    }

    hit(){this.hitCount++}

    isSunk(){return (this.hitCount >= this.length) ? true : false}
}

export {Ship}