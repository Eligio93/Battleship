import { disableGameboard, styleCell} from "./UI";

function generateComputerCoordinates() {
    let coordinates = Math.floor(Math.random() * 100);
    coordinates=coordinates.toString();
    if (coordinates < 10) {
        coordinates = '0' + coordinates
    }
    return coordinates;
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
        //waits one second before apply style to the chosen cell
        await new Promise((resolveTimeOut)=>{
            setTimeout(()=>{
                styleCell(computer,attackResult,coordinates); 
                resolveTimeOut();  
            },1000)           
        })       
        if (!computer.active) {
            resolve()  
        } else {
            //calls recursively computer Round until when the computer is not active
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

export {playRound, userRound, computerRound}