//creates Ship class
import { disableGameboard } from "./UI";
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
        // this.missedShots = [];
        this.totalShots = [];
    }

    receiveAttack(coordinates) {
        if (this.totalShots.includes(coordinates)) {
            return null //"Shoot again"
        };
        let found = false;
        this.ships.forEach(ship => {
            if (ship.coordinates.includes(coordinates)) {
                found = true;
                ship.hit();
                if (ship.isSunk()) {
                    this.shipsNumber -= 1;
                    //here we need to check if there s any ship lefts
                }
            }
        })
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
        if (opponentGameboard.receiveAttack(coordinates) == false) {
            opponentGameboard.player.active = true;
            this.active = false;
        }

    }
}
let playRound = function (activePlayerGameboard,otherPlayerGameboard) {
    disableGameboard(activePlayerGameboard);
    document.querySelectorAll(".game-section").forEach(element=>{
        element.addEventListener("click",function(event){        
            console.log("ciao");
            playRound(otherPlayerGameboard,activePlayerGameboard)
        })
    })


    // if (user.active == true) {
    //     disableGameboard(userGameboard);
    //     document.getElementById("computer-side").addEventListener("click", function (event) {
    //         console.log(event.target);
    //         user.active=false;
    //         computer.active=true;
    //     })
    // } else {
    //     disableGameboard(computerGameboard);
    //     document.getElementById("player-side").addEventListener("click", function (event) {
    //         console.log(event.target);
    //         user.active=true;
    //         computer.active=false;
            
    //     })
    // }
    // playRound(user,computer,userGameboard,computerGameboard)

    // USER TURN CHECK == true
    // if true click on board get coodinates
    // attack(coordinate, opponent gameboard)
    // while attacking on oppponet diable usergameboard
    // disablegameboard(userGameBoard)

    //else 
    // 

}
export { Ship, Gameboard, Player, playRound }

