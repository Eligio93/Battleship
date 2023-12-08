let {Gameboard,Ship, Player} = require("./App");


test('hitted boat', () => {
    let gameboard1= new Gameboard(new Player("Player1",true), new Ship(4))
    gameboard1.receiveAttack("00");
    expect(gameboard1.ships[0].hits).toBe(1);
});
test('Sunk boat', () =>{
    let gameboard1= new Gameboard(new Player("Player1",true), new Ship(4))
    gameboard1.receiveAttack("00");
    gameboard1.receiveAttack("01");
    gameboard1.receiveAttack("02");
    gameboard1.receiveAttack("03");
    expect(gameboard1.ships[0].sunk).toBeTruthy()
})
test('missing shot', ()=>{
    let gameboard1= new Gameboard(new Player("Player1",true), new Ship(4))
    gameboard1.receiveAttack("25")
    expect(gameboard1.missingCoordinates[0]).toBe("25")
})
test('all ships are sunk',()=>{
    let gameboard1= new Gameboard(new Player("Player1",true), new Ship(4))
    gameboard1.receiveAttack("00");
    gameboard1.receiveAttack("01");
    gameboard1.receiveAttack("02");
    gameboard1.receiveAttack("03");
    expect( gameboard1.shipsNumber).toBe(0);

})
test('switching players', ()=>{
    let player1=new Player("Player1",true);
    let computer=new Player("Computer", false);
    let playerGameboard=new Gameboard(player1, new Ship(4))
    let computerGameboard=new Gameboard(computer, new Ship(4))
    player1.attackOpponent("00",computerGameboard);
    expect(player1.active).toBeFalsy();
    expect(computer.active).toBeTruthy()
    computer.attackOpponent("00",playerGameboard);
    expect(computer.active).toBeFalsy()
    expect(player1.active).toBeTruthy();
})
