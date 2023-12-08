let {Gameboard,Ship} = require("./App");


test('hitted boat', () => {
    let gameboard1= new Gameboard("Player1", new Ship(4))
    gameboard1.receiveAttack("00");
    expect(gameboard1.ships[0].hits).toBe(1);
});
test('Sunk boat', () =>{
    let gameboard1= new Gameboard("Player1", new Ship(4))
    gameboard1.receiveAttack("00");
    gameboard1.receiveAttack("01");
    gameboard1.receiveAttack("02");
    gameboard1.receiveAttack("03");
    expect(gameboard1.ships[0].sunk).toBeTruthy()
})
test('missing shot', ()=>{
    let gameboard1= new Gameboard("Player1", new Ship(4))
    gameboard1.receiveAttack("25")
    expect(gameboard1.missingCoordinates[0]).toBe("25")
})
test('all ships are sunk',()=>{
    let gameboard1= new Gameboard("Eligio", new Ship(4))
    gameboard1.receiveAttack("00");
    gameboard1.receiveAttack("01");
    gameboard1.receiveAttack("02");
    gameboard1.receiveAttack("03");
    expect( gameboard1.shipsNumber).toBe(0);

})
