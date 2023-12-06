class Ship{
    constructor(length){
        this.length=length,
        this.x=0;
        this.y=0;
        this.hits=0;
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

let boat= new Ship(4);

module.exports=boat;
