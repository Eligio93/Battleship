import {Ship, Gameboard, Player} from "./App.js";

test("ship s been hitted", ()=>{
    let user= new Player("user", true);
    let computer= new Player("computer" ,false);
    let userShips=[new Ship(4,["00","01","02","03"]),new Ship(4,["21","22","23","24"])]
    let computerShips=[new Ship(4,["30","31","32","33"]),new Ship(4,["81","82","83","84"])]
    let userGameboard=new Gameboard(user,userShips);
    let computerGameboard=new Gameboard(computer,computerShips);
    user.attackOpponent("30",computerGameboard)
    expect(computerGameboard.ships[0].hits).toBe(1);
    computer.attackOpponent("00",userGameboard);
    expect(userGameboard.ships[0].hits).toBe(1)
    user.attackOpponent("31",computerGameboard);
    expect(computerGameboard.ships[0].hits).toBe(2);
    computer.attackOpponent("55",userGameboard);
    expect(userGameboard.ships[0].hits).toBe(1)
    expect(userGameboard.ships[1].hits).toBe(0)
})