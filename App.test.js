const gameboard1 = require("./App");

test('hitted boat', () => {
    gameboard1.receiveAttack("A1");
    expect(gameboard1.ships[0].hits).toBe(1);
});
test('Sunk boat', () =>{
    gameboard1.receiveAttack("A1");
    gameboard1.receiveAttack("A2");
    gameboard1.receiveAttack("A3");
    gameboard1.receiveAttack("A4");
    expect(gameboard1.ships[0].sunk).toBeTruthy()
})
test('missing shot', ()=>{
    gameboard1.receiveAttack("B1")
    expect(gameboard1.missingCoordinates[0]).toBe("B1")
})
test('all ships are sunk',()=>{
    gameboard1.receiveAttack("A1");
    gameboard1.receiveAttack("A2");
    gameboard1.receiveAttack("A3");
    gameboard1.receiveAttack("A4");
    expect( gameboard1.shipsNumber).toBe(0);

})
