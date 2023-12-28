// body.addevnetlistener(click, function(event){
    //event.target
import { displayGameboard } from "./UI";
import { Player,Gameboard,Ship} from "./App";
import { playRound, } from "./gameController";
import "./style.css"

let user= new Player("user", true);
let computer= new Player("computer" ,false);

let userShips=[new Ship(4,["00","01","02","03"]),new Ship(4,["21","22","23","24"])]
let computerShips=[new Ship(4,["30","31","32","33"]),new Ship(4,["81","82","83","84"])]

let userGameboard=new Gameboard(user,userShips);
let computerGameboard=new Gameboard(computer,computerShips);

displayGameboard(userGameboard);
displayGameboard(computerGameboard);

playRound(user, userGameboard, computer, computerGameboard);




