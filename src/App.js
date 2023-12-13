//creates Ship clas
class Ship {
    constructor(length, coordinates) {
        this.length = length;
        this.coordinates = coordinates;
        this.hits = 0;
        this.sunk = false;
    }
    hit() {
        this.hits += 1;
    }
    isSunk() {
        if (this.hits == this.length) {
            this.sunk = true;
            return true
        } else {
            return false
        }
    }
}


class Gameboard {
    constructor(player, ships) {
        this.player = player
        this.ships = [ships];
        this.shipsNumber=ships.length;
        this.missedShots = [];
        this.totalShots = [];
    }

    receiveAttack(coordinates) {
        if(this.totalShots.includes(coordinates)){
            return
        };
        let found=false;
        this.ships.forEach(ship => {
            if (ship.coordinates.includes(coordinates)) {
                found=true;
                ship.hit();
                if (ship.isSunk()) {
                    this.shipsNumber -= 1;
                    //check if there s any ship left
                    return "Ship Sunked"
                } else {
                    return "Ship hitted"
                }
            }
        })
        if(found=false){
            this.missedShots.push(coordinates);
        }
    }
}