//vanno le funzioni da usare in index.js che modifica il DOM
import "./style.css"
function displayGameboard(playerDiv,gameboard){
    let shipscoordinates=((gameboard.ships).map(obj=>obj.coordinates)).flat();
    for(let i=0;i<10;i++){
        for(let j=0;j<10;j++){
            let cell=document.createElement("div");
            cell.className="cell";
            let cellCoordinates=i+''+j;
            cell.setAttribute("data-coordinates",cellCoordinates);
            cell.textContent=''+i+''+j;
            if(shipscoordinates.includes(cellCoordinates)){
                cell.style.backgroundColor="green";
            }
            playerDiv.appendChild(cell);
        }
    }    
}
export {displayGameboard}