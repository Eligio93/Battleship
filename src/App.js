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


function userRound(user, userGameboard, computerGameboard) {
    disableGameboard(userGameboard);
    return new Promise((resolve) => {
        function handleClick(event) {
            let coordinates = event.target.getAttribute("data-coordinates");
            let attackResult=user.attackOpponent(coordinates, computerGameboard);
            styleCell(user,attackResult,coordinates);            
            if (!user.active) {
                //remove the event listener
                document.getElementById("computer-side").removeEventListener("click", handleClick);
                    resolve()
            } else {
                //remove the event listener
                document.getElementById("computer-side").removeEventListener("click", handleClick);
                //resolve in a recursive way
                resolve(userRound(user, userGameboard, computerGameboard))
            }
        }       
        document.getElementById("computer-side").addEventListener("click", handleClick);
    })
}

function computerRound(computer, computerGameboard, userGameboard) {
    disableGameboard(computerGameboard);
    return new Promise(async (resolve) => {
        let coordinates = generateComputerCoordinates();
        let attackResult=computer.attackOpponent(coordinates, userGameboard)
        await new Promise((resolveTimeOut)=>{
            setTimeout(()=>{
                styleCell(computer,attackResult,coordinates); 
                resolveTimeOut();  
            },1000)           
        })       
        if (!computer.active) {
            resolve()  
        } else {
            resolve(computerRound(computer, computerGameboard, userGameboard))
        }    
    })
}


let playRound = async function (user, userGameboard, computer, computerGameboard) {
    while(true){
        await userRound(user, userGameboard, computerGameboard);
        await computerRound(computer, computerGameboard, userGameboard)
    }
}




function generateComputerCoordinates() {
    let coordinates = Math.floor(Math.random() * 100);
    coordinates=coordinates.toString();
    if (coordinates < 10) {
        coordinates = '0' + coordinates
    }
    return coordinates;
}


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


export { Ship, Gameboard, Player, playRound, userRound, computerRound }

