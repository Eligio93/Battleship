import { Gameboard, Player, Ship } from "./App";
import "./style.css";
import { displayGameboard } from "./UI";

let user=new Player("Eligio",true);
let computer=new Player("Computer",false);

let userShips= [new Ship(4,["00","01","02","03"]),new Ship(4,["20","21","22","23"])];
let computerShips=[new Ship(4,["70","71","72","73"]),new Ship(4,["80","81","82","83"])];

let userGameboard=new Gameboard(user,userShips);
let computerGameboard= new Gameboard(computer,computerShips)

displayGameboard(userGameboard);
displayGameboard(computerGameboard);
if(userGameboard.player.active==true){
    console.log("Sono attivo")
    document.getElementById("player-side").style.pointerEvents="none";
}
document.getElementById("computer-side").addEventListener("click",function(event){
    let coordinates=event.target.getAttribute("data-coordinates")
    console.log(coordinates);
    user.attackOpponent(coordinates,computerGameboard)
    console.log(user.attackOpponent(coordinates,computerGameboard))
    console.log(userGameboard,computerGameboard)
})




export {user,computer,userGameboard,computerGameboard}