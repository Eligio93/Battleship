//creates Ship class
import { disableGameboard, styleCell, displayWinner } from "./UI";
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
        //if the shot is valid change turn and return false
        if (opponentGameboard.receiveAttack(coordinates) == false) {
            opponentGameboard.player.active = true;
            this.active = false;
            return false
        }else if(opponentGameboard.receiveAttack(coordinates) == true){
            //the shot hited a ship and turn is not changing
            return true
        }else{
            //not valid shot so no changing turn
            return null
        }
    }
}


function userRound(user, userGameboard, computerGameboard) {
    disableGameboard(userGameboard);
    document.getElementById("computer-side").addEventListener("click", function (event) {
        let coordinates = event.target.getAttribute("data-coordinates");
        user.attackOpponent(coordinates, computerGameboard);
    })
}

function computerRound(computer, computerGameboard, userGameboard) {
    disableGameboard(computerGameboard);
    let coordinates = generateComputerCoordinates();
    console.log(coordinates)
    computer.attackOpponent(coordinates, userGameboard)
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
                // coordinates=generateComputerCoordinates();
                console.log(coordinates)
                computer.attackOpponent(coordinates, userGameboard)
            }
        })
    })
}




// function generateComputerCoordinates(){
//     let coordinates=Math.floor(Math.random()*100);
//     if(coordinates<10){
//         coordinates='0'+coordinates
//     }
//     return coordinates;
// }


// let playRound = function (user, userGameboard, computer, computerGameboard) {
//     disableGameboard(userGameboard);
//     document.querySelectorAll(".game-section").forEach(element => {
//         element.addEventListener("click", function (event) {
//             let coordinates = event.target.getAttribute("data-coordinates");
//             if (user.active == true) {
//                 console.log(coordinates)
//                 user.attackOpponent(coordinates, computerGameboard);
//             } else {
//                 // coordinates=generateComputerCoordinates();
//                 console.log(coordinates)
//                 computer.attackOpponent(coordinates, userGameboard)
//             }
//         })
//     })
// }


export { Ship, Gameboard, Player, /*playRound,*/ userRound }

