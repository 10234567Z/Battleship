import attackOther from "./attack";

var startScreen = "" +
    "  <div class=\"container\">" +
    "    <header class=\"fixedHead\">" +
    "      <h1>Battle Ship</h1>" +
    "      <p>Where the real one fights</p>" +
    "    </header>" +
    "    <main>" +
    "      <p>You</p>" +
    "      <div class=\"humanB board\"></div>" +
    "      <p>Opponent</p>" +
    "      <div class=\"AIB board\"></div>" +
    "    </main>" +
    "    <footer>&copy; Fudo</footer>" +
    "  </div>" +
    "";

export default function gameStart(human, computer) {
    
    document.querySelector("body").innerHTML = startScreen;

    /** Make Grid */
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            document.querySelectorAll('.board').forEach((board) => {
                let cell = document.createElement('div');
                cell.classList.add(`cell`, `cell${i}${j}`);
                board.append(cell)
            })
        }
    }

    let tempCoords = human.gameBoardFact.shipsBoarded.map((ship) => ship.coordinates);
    let shipCoords = [];
    for (let i = 0; i < tempCoords.length; i++) {
        for (let j = 0; j <= i; j++) {
            shipCoords.push(tempCoords[i][j])
        }
    }
    let humanB = document.querySelector(".humanB");
    for (let i = 0; i < 15; i++) {
        humanB.querySelector(`.cell${shipCoords[i][0]}${shipCoords[i][1]}`).style.backgroundColor = "red";
    }

    document.querySelector(".AIB").childNodes.forEach((cell) => {
        cell.addEventListener('click' , e => {
            attackOther(human , computer , cell);
        })
    })
}