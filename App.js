class Ship{
    constructor(length){
        this.length=length;
        this.hits=0;
        this.coordinates=["00","01","02","03"];
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
    constructor(player,ship){
        this.player=player;
        this.shipsNumber=1;
        this.ships=[ship];
        this.missingCoordinates=[]
    }
    receiveAttack(coordinates){
        let found=false
        //looks in each ship if the coordinate of the shot matches
        this.ships.forEach(object=>{
        if(object.coordinates.includes(coordinates)){  
            //if matches hit the ship and check if it s sunk         
            found=true;
            object.hit();
            if(object.isSunk()){
                this.shipsNumber-=1
            }
        }
      })
      //if doesn t match put the coordinates in missing coordinates
      //later we can change the color to the cell and make it impossible to click again
      if(found==false){
        this.missingCoordinates.push(coordinates);
      }
      return found
    }
}
class Player{
    constructor(name,active){
        this.name=name
        this.active=active
    }
    attackOpponent(coordinates,opponentGameboard){
        opponentGameboard.receiveAttack(coordinates);
        this.active=false;
    }
}

module.exports={Gameboard,Ship,Player};
