import { parse } from 'postcss';
import Randomize from './randomizeBoard';
import './styles.css';
import Player from './player';
import Ship from './battleship';
import gameStart from './mainGame';

var startScreen = "" +
    "  <div class=\"container\">" +
    "    <header class=\"fixedHead\">" +
    "      <h1>Battle Ship</h1>" +
    "      <p>Where the real one fights</p>" +
    "    </header>" +
    "    <main>" +
    "      <div class=\"board\"></div>" +
    "      <p class=\"inputHead\">Type your Name</p> <br>" +
    "      <input type=\"text\" maxlength=\"12\" minlength=\"1\">" +
    "      <p class=\"error\"></p>" +
    "      <div class=\"moves\">" +
    "           <p>Hold the ship from first tile and drag it</p>" +
    "           <div class=\"ship s5\"  draggable=true ></div>" +
    "           <div class=\"ship s4\"  draggable=true ></div>" +
    "           <div class=\"ship s3\"  draggable=true ></div>" +
    "           <div class=\"ship s2\"  draggable=true ></div>" +
    "           <div class=\"ship s1\"  draggable=true ></div>" +
    "       </div>" +
    "           <h3>OR</h3>" +
    "       <div class=\"random\">Randomize</div>" +
    "       <div class=\"reset\">Reset</div>" +
    "    </main>" +
    "    <footer>&copy; Fudo</footer>" +
    "  </div>" +
    "";


export default function makeUI() {
    let startCoords = []
    document.querySelector("body").innerHTML = startScreen;

    /** Make Grid */

    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            let cell = document.createElement('div');
            cell.classList.add(`cell`, `c${i}${j}`);
            cell.setAttribute("style", "background-color: white;")
            document.querySelector('.board').append(cell);
        }
    }

    /** Filling up moves inside block */
    for (let i = 1; i <= 5; i++) {
        let currentShip = document.querySelector(`.s${i}`);
        for (let j = 1; j <= i; j++) {
            let part = document.createElement("div");
            currentShip.append(part);
        }
    }

    /** Name Validation */
    document.querySelector('input').addEventListener('blur', e => {
        if (e.target.value.trim() === '') {
            document.querySelector('.error').innerHTML = "No empty names allowed!"
            document.querySelector('.error').style.boxShadow = "-1px 1px 15px 7px rgba(255,0,0,0.09)"
            e.target.style.borderColor = "red"
        }
        else {
            document.querySelector('.error').innerHTML = "";
            document.querySelector('.error').style.boxShadow = "none"
            e.target.style.borderColor = "black"
        }
    })

    /** Randomize placement */
    document.querySelector('.random').addEventListener('click', e => {
        if (document.querySelector('input').value.trim() !== '') {
            Randomize(document.querySelector('input').value.trim());
        }
    })

    /** Drag and drop placement */
    document.querySelectorAll('.ship').forEach((ship) => {
        ship.addEventListener('dragstart', e => {
            localStorage.setItem("currentShip", JSON.stringify({ class: ship.classList[0], size: parseInt(ship.classList[1].replace("s", '')) }))
        })
    });


    document.querySelectorAll('.cell').forEach((cell) => {

        cell.addEventListener('click', e => {
            if (startCoords.includes(cell.classList[1].replace("c", ''))) {
                let isSafe = false;
                let currentShip;
                for (let i = 1; i <= 5; i++) {
                    if (localStorage.getItem(`ship${i}`) !== null && JSON.parse(localStorage.getItem(`ship${i}`)).coord == cell.classList[1].replace("c", '')) {
                        currentShip = i;
                        break;
                    }
                }

                if (JSON.parse(localStorage.getItem(`ship${currentShip}`)).vertical === false) {
                    for (let i = 1; i < currentShip; i++) {
                        if (document.querySelector(`.c${parseInt(cell.classList[1].replace("c", '').slice(0, 1)) + i}${cell.classList[1].replace("c", '').slice(1)}`) !== null
                            && document.querySelector(`.c${parseInt(cell.classList[1].replace("c", '').slice(0, 1)) + i}${cell.classList[1].replace("c", '').slice(1)}`).style.backgroundColor === "white"
                        ) {
                            isSafe = true;
                        }
                        else {
                            isSafe = false;
                            break;
                        }
                    }
                }
                else {
                    for (let i = 1; i < currentShip; i++) {
                        if (document.querySelector(`.c${cell.classList[1].replace("c", '').slice(0, 1)}${parseInt(cell.classList[1].replace("c", '').slice(1)) + i}`) !== null
                            && document.querySelector(`.c${cell.classList[1].replace("c", '').slice(0, 1)}${parseInt(cell.classList[1].replace("c", '').slice(1)) + i}`).style.backgroundColor === "white") {
                            isSafe = true;
                        }
                        else {
                            isSafe = false;
                        }
                    }
                }
                if (isSafe) {
                    for (let i = 1; i < currentShip; i++) {
                        {
                            if (JSON.parse(localStorage.getItem(`ship${currentShip}`)).vertical === false) {
                                document.querySelector(`.c${cell.classList[1].replace("c", '').slice(0, 1)}${parseInt(cell.classList[1].replace("c", '').slice(1)) + i}`).style.backgroundColor = 'white'
                                document.querySelector(`.c${parseInt(cell.classList[1].replace("c", '').slice(0, 1)) + i}${cell.classList[1].replace("c", '').slice(1)}`).style.backgroundColor = 'red'
                                if (i === (currentShip - 1)) {
                                    let data = JSON.parse(localStorage.getItem(`ship${currentShip}`));
                                    data.vertical = true;
                                    localStorage.setItem(`ship${currentShip}`, JSON.stringify(data));
                                };
                            }
                            else {
                                document.querySelector(`.c${cell.classList[1].replace("c", '').slice(0, 1)}${parseInt(cell.classList[1].replace("c", '').slice(1)) + i}`).style.backgroundColor = 'red'
                                document.querySelector(`.c${parseInt(cell.classList[1].replace("c", '').slice(0, 1)) + i}${cell.classList[1].replace("c", '').slice(1)}`).style.backgroundColor = 'white'
                                if (i === (currentShip - 1)) {
                                    let data = JSON.parse(localStorage.getItem(`ship${currentShip}`));
                                    data.vertical = false;
                                    localStorage.setItem(`ship${currentShip}`, JSON.stringify(data));
                                };
                            }
                        }
                    }
                }
            }
        })

        cell.addEventListener('dragover', (e) => {
            e.preventDefault(); // Allow drop
        });

        cell.addEventListener('dragenter', e => {
            const data = JSON.parse(localStorage.getItem("currentShip"));
            for (let i = 0; i < data.size; i++) {
                const cellIndex = cell.classList[1].replace("c", '').slice(1);
                const maxIndex = parseInt(cellIndex) + (data.size - 1);
                if (document.querySelector(`.c${cell.classList[1].slice(1, 2)}${maxIndex.toString()}`) !== null && cell.style.backgroundColor !== 'red') {
                    cell.style.backgroundColor = 'gray';
                }
            }
        })

        cell.addEventListener('dragleave', e => {
            const data = JSON.parse(localStorage.getItem("currentShip"));
            for (let i = 0; i < data.size; i++) {
                const cellIndex = cell.classList[1].replace("c", '').slice(1);
                const maxIndex = parseInt(cellIndex) + (data.size - 1);
                if (document.querySelector(`.c${cell.classList[1].slice(1, 2)}${maxIndex.toString()}`) !== null && cell.style.backgroundColor !== 'red') {
                    cell.style.backgroundColor = 'white';
                }
            }
        })

        cell.addEventListener('drop', (e) => {
            e.preventDefault();
            const data = JSON.parse(localStorage.getItem("currentShip"));
            let isDropped = false;
            let isSafe = false;
            const cellIndex = cell.classList[1].replace("c", '').slice(1);
            const maxIndex = parseInt(cellIndex) + (data.size - 1);
            if (data.size == 1) {
                isSafe = true;
            }
            for (let i = 1; i < data.size; i++) {
                if (document.querySelector(`.c${cell.classList[1].replace("c", '').slice(0, 1)}${parseInt(cell.classList[1].replace("c", '').slice(1)) + i}`) !== null
                    && data.size == 1 || (document.querySelector(`.c${cell.classList[1].replace("c", '').slice(0, 1)}${parseInt(cell.classList[1].replace("c", '').slice(1)) + i}`).style.backgroundColor === "white")) {
                    isSafe = true;
                }
                else {
                    cell.style.backgroundColor = 'white'
                    isSafe = false;
                    break;
                }
            }
            for (let i = 0; i < data.size; i++) {
                if (document.querySelector(`.c${cell.classList[1].slice(1, 2)}${maxIndex.toString()}`) !== null && isSafe) {
                    if (i == 0) {
                        startCoords.push(cell.classList[1].replace("c", ''))
                        localStorage.setItem(`ship${data.size}`, JSON.stringify({ coord: startCoords[startCoords.length - 1], vertical: false }))
                    }
                    const nextCellIndex = parseInt(cellIndex) + i;
                    const cellToFill = document.querySelector(`.c${cell.classList[1].slice(1, 2)}${nextCellIndex.toString()}`)
                    cellToFill.style.backgroundColor = 'red';
                    isDropped = true
                }
            }
            if (isDropped) {
                document.querySelector(`.s${data.size}`).remove()
            }
            if (document.querySelector('.ship') === null) {
                document.querySelector('.moves').innerHTML = `
                <div class=\"confirm\">Confirm</div>
                `;

                document.querySelector('.confirm').addEventListener('click', e => {
                    if (document.querySelector('input').value.trim() !== '') {
                        let human = new Player(document.querySelector('input').value.trim());
                        for (let i = 1; i <= 5; i++) {
                            let shipROWCOORD = parseInt(JSON.parse(localStorage.getItem(`ship${i}`)).coord.slice(0, 1));
                            let shipCOLCOORD = parseInt(JSON.parse(localStorage.getItem(`ship${i}`)).coord.slice(1));
                            let isVertical = JSON.parse(localStorage.getItem(`ship${i}`)).vertical;
                            let selectedShip = new Ship(i);
                            human.boardShip(shipROWCOORD, shipCOLCOORD, selectedShip, isVertical)
                        }
                        let computer = new Player('Computer', true);
                        computer.aiBoardShip();
                        gameStart(human , computer)
                    }
                })
            }
        });
    });

    document.querySelector('.reset').addEventListener('click', () => {
        localStorage.clear()
        makeUI();
    })
}
makeUI()