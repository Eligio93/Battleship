//creates Ship class
import { disableGameboard, styleCell,displayWinner } from "./UI";
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
        let found = false;
        if (this.totalShots.includes(coordinates)) {
            return null; //"Shoot again"
        };

        this.ships.forEach(ship => {
            if (ship.coordinates.includes(coordinates)) {
                this.totalShots.push(coordinates);
                found = true;
                ship.hit();
                styleCell(this,coordinates,found)
                if (ship.isSunk()) {
                    this.shipsNumber -= 1;
                    if(this.shipsNumber==0){
                        displayWinner(this);
                    }
                }
            }
        })
        if (found == false) {
            this.totalShots.push(coordinates);
            styleCell(this,coordinates,found)
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
        if (opponentGameboard.receiveAttack(coordinates) == false) {
            opponentGameboard.player.active = true;
            disableGameboard(opponentGameboard);//disable gameboard of the active player
            this.active = false;
        }

    }
}
function generateComputerCoordinates(){
    let coordinates=Math.floor(Math.random()*100);
    if(coordinates<10){
        coordinates='0'+coordinates
    }
    return coordinates;
}


let playRound = function (user, userGameboard, computer, computerGameboard) {
    disableGameboard(userGameboard);
    document.querySelectorAll(".game-section").forEach(element => {
        element.addEventListener("click", function (event) {
            let coordinates = event.target.getAttribute("data-coordinates");
            if (user.active == true) {
                console.log(coordinates)
                user.attackOpponent(coordinates, computerGameboard);
            } else {
                coordinates=generateComputerCoordinates();
                console.log(coordinates)
                computer.attackOpponent(coordinates, userGameboard)
            }
        })
    })
}


export { Ship, Gameboard, Player, playRound }

