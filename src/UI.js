function displayGameboard(gameboard) {
    let shipsCoordinates = (gameboard.ships.map(obj => obj.coordinates)).flat();
    console.log(shipsCoordinates);
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            let cell = document.createElement("div");
            cell.className = "cell";
            cell.textContent = i + '' + j;
            cell.setAttribute("data-coordinates", i + '' + j);
            if (shipsCoordinates.includes(cell.getAttribute("data-coordinates"))/*&& gameboard.player.name!=="computer"*/) {
                cell.style.backgroundColor = "green"
            }
            if (gameboard.player.name == "computer") {
                document.getElementById("computer-side").appendChild(cell);
            } else {
                document.getElementById("player-side").appendChild(cell);
            }
        }
    }


}
function disableGameboard(gameboard) {
    if (gameboard.player.name == "computer") {
        document.getElementById("computer-side").style.pointerEvents = "none";
        document.getElementById("player-side").style.pointerEvents = "auto";
    } else {
        document.getElementById("computer-side").style.pointerEvents = "auto";
        document.getElementById("player-side").style.pointerEvents = "none";
    }
}

function styleCell(player, attackResult, coordinates) {
    let cell;
    if (player.name == "user") {
        cell = document.getElementById("computer-side").querySelector('[data-coordinates="' + coordinates + '"]');
    } else {
        cell = document.getElementById("player-side").querySelector('[data-coordinates="' + coordinates + '"]');
    }
    if (attackResult == true) {
        cell.style.backgroundColor = "pink";
    } else if (attackResult == false) {
        cell.style.backgroundColor = "blue";
    }
}

function displayWinner(loserGameboard) {
    document.getElementById("player-side").style.pointerEvents = "none";
    document.getElementById("computer-side").style.pointerEvents = "none";
    if (loserGameboard.player.name == "computer") {
        console.log("you win")
    } else {
        console.log("computer wins")
    }
}


export { displayGameboard, disableGameboard, styleCell, displayWinner }