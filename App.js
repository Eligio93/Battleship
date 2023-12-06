class Ship{
    constructor(length,position){
        this.length=length,
        // this.x=0;
        // this.y=0;
        this.hits=0;
        this.coordinates=["A1","A2","A3","A4"];
        // this.position=position;
        this.sunk=false;
    }
    hit(){
        return this.hits+=1
    }
    isSunk(){
        if(this.hits==this.length){
            this.sunk=true
            return true
        }else{
            return false
        }
    }
}
class Gameboard{
    constructor(player){
        this.player=player
        this.shipsNumber=4;
        this.ships=[new Ship(4)];
        this.missingCoordinates=[]
    }
    receiveAttack(coordinates){
        let found=false
        this.ships.forEach(object=>{
        if(object.coordinates.includes(coordinates)){           
            found=true;
            object.hit();
            if(object.isSunk()){
                this.shipsNumber-=1
            }
        }
      })
      if(found==false){
        this.missingCoordinates.push(coordinates);
      }
      return found
    }
}

let gameboard1=new Gameboard();
// gameboard1.receiveAttack("A1");

module.exports=gameboard1;
