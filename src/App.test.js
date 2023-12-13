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
test("ship s been sunk",()=>{
    let user= new Player("user", true);
    let computer= new Player("computer" ,false);
    let userShips=[new Ship(4,["00","01","02","03"]),new Ship(4,["21","22","23","24"])]
    let computerShips=[new Ship(4,["30","31","32","33"]),new Ship(4,["81","82","83","84"])]
    let userGameboard=new Gameboard(user,userShips);
    let computerGameboard=new Gameboard(computer,computerShips);
    user.attackOpponent('30',computerGameboard);
    computer.attackOpponent('01',userGameboard);
    user.attackOpponent('31',computerGameboard);
    computer.attackOpponent('03',userGameboard);
    user.attackOpponent('32',computerGameboard);
    computer.attackOpponent('22',userGameboard);
    user.attackOpponent('33',computerGameboard);
    computer.attackOpponent('24',userGameboard);
    expect(computerGameboard.ships[0].isSunk()).toBeTruthy();
    expect(computerGameboard.ships[1].isSunk()).toBeFalsy();
})
test("all ships are sunk", ()=>{
    let user= new Player("user", true);
    let computer= new Player("computer" ,false);
    let userShips=[new Ship(4,["00","01","02","03"]),new Ship(4,["21","22","23","24"])]
    let computerShips=[new Ship(4,["30","31","32","33"]),new Ship(4,["81","82","83","84"])]
    let userGameboard=new Gameboard(user,userShips);
    let computerGameboard=new Gameboard(computer,computerShips);
    user.attackOpponent("30",computerGameboard)
    user.attackOpponent("31",computerGameboard)
    user.attackOpponent("32",computerGameboard)
    user.attackOpponent("33",computerGameboard)
    user.attackOpponent("81",computerGameboard)
    user.attackOpponent("82",computerGameboard)
    user.attackOpponent("83",computerGameboard)
    user.attackOpponent("84",computerGameboard)
    expect(computerGameboard.shipsNumber).toBe(0)
})
test("change player's turn", ()=>{
    let user= new Player("user", true);
    let computer= new Player("computer" ,false);
    let userShips=[new Ship(4,["00","01","02","03"]),new Ship(4,["21","22","23","24"])]
    let computerShips=[new Ship(4,["30","31","32","33"]),new Ship(4,["81","82","83","84"])]
    let userGameboard=new Gameboard(user,userShips);
    let computerGameboard=new Gameboard(computer,computerShips);
    expect(user.active).toBeTruthy();
    expect(computer.active).toBeFalsy();
    user.attackOpponent("30",computerGameboard);
    expect(user.active).toBeTruthy();
    expect(computer.active).toBeFalsy();
    user.attackOpponent("29",computerGameboard);
    expect(user.active).toBeFalsy();
    expect(computer.active).toBeTruthy();
    computer.attackOpponent("00",userGameboard);
    expect(computer.active).toBeTruthy();
    expect(user.active).toBeFalsy();
    computer.attackOpponent("21",userGameboard);
    expect(computer.active).toBeTruthy();
    expect(user.active).toBeFalsy();
    computer.attackOpponent("90",userGameboard);
    expect(computer.active).toBeFalsy();
    expect(user.active).toBeTruthy();
    
})