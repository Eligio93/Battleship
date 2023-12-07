//vanno le funzioni da usare in index.js che modifica il DOM

function displayGameboard(playerDiv){
    for(let i=0;i<10;i++){
        for(let j=0;j<10;j++){
            let cell=document.createElement("div");
            cell.className="class";
            cell.setAttribute("data-x",i);
            cell.setAttribute("data-y",j);
            playerDiv.appendChild(cell);
        }
    }
    
}