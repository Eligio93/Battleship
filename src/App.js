//creates Ship clas
class Ship {
    constructor(length,coordinates){
        this.length=length;
        this.coordinates=coordinates;
        this.hits=0;
        this.sunk=false;
    }
    hit(){
        this.hits+=1;
    }
    isSunk(){
        if(this.hits==this.length){
            this.sunk=true;
            return true
        }else{
            return false
        }
    }
}