export default function updateScreen(humanB , aiB){
    let hUI = document.querySelector('.humanB');
    let aUI = document.querySelector('.AIB')
    for(let i = 0 ; i < 10; i++){
        for(let j = 0; j < 10; j++){
            if(humanB[i][j] == "hit"){
                hUI.querySelector(`.cell${i}${j}`).style.backgroundColor = "lightcoral"
            }
            else if(humanB[i][j] == 1){
                hUI.querySelector(`.cell${i}${j}`).style.backgroundColor = "red"
            }
            else if(humanB[i][j] == "miss"){
                hUI.querySelector(`.cell${i}${j}`).style.backgroundColor = "rgba(0,0,0,0.2)"
            }

            if(aiB[i][j] == "hit"){
                aUI.querySelector(`.cell${i}${j}`).style.backgroundColor = "lightcoral"
            }
            else if(aiB[i][j] == 1){
                aUI.querySelector(`.cell${i}${j}`).style.backgroundColor = "red"
            }
            else if(aiB[i][j] == "miss"){
                aUI.querySelector(`.cell${i}${j}`).style.backgroundColor = "rgba(0,0,0,0.2)"
            }

        }
    }
}