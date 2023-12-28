//creates Ship class
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

//creates Gameboard class
class Gameboard {
    constructor(player, ships) {
        this.player = player
        this.ships = ships;
        this.shipsNumber = ships.length;
        this.totalShots = [];
    }

    receiveAttack(coordinates) {
        //variable to check if the ship is been found or not
        let found = false;
        if (this.totalShots.includes(coordinates)) {
            //if the shot is been already done the function returns null
            return null;
        };
        //check in each ship if the coordinates are matching with the ship
        this.ships.forEach(ship => {
            //if found the function returns true
            if (ship.coordinates.includes(coordinates)) {
                found = true;
                this.totalShots.push(coordinates);
                ship.hit();
                if (ship.isSunk()) {
                    this.shipsNumber -= 1;
                }
            }
        })
        //if the shot is valid but doesn t find ship returns false
        if (found == false) {
            this.totalShots.push(coordinates);

        }
        return found
    }
}

class Player {
    constructor(name, active) {
        this.name = name,
            this.active = active
    }

    attackOpponent(coordinates, opponentGameboard) {
        let attackResult = opponentGameboard.receiveAttack(coordinates);
        //if the shot is valid change turn and return false
        if (attackResult == false) {
            opponentGameboard.player.active = true;
            this.active = false;
            return false
        } else if (attackResult == true) {
            //the shot hited a ship and turn is not changing           
            return true
        } else {
            //not valid shot so no changing turn
            return null
        }
    }
}

export { Ship, Gameboard, Player }

