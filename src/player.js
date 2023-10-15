import Ship from "./battleship";
import GameBoard from "./gameboard";

export default function Player(playerName, isAI = true) {
    let name = playerName;
    let gameBoardFact = new GameBoard();
    let board = gameBoardFact.getBoard();

    let boardShip = (row, col, ship, vertical = true) => {
        if (gameBoardFact.shipsBoarded.length !== 5) {
            gameBoardFact.PlaceShip(row, col, ship, vertical);
        }
    }

    let aiBoardShip = () => {
        if (isAI) {
            while (gameBoardFact.shipsBoarded.length < 5) {
                let ship = new Ship(gameBoardFact.shipsBoarded.length + 1);
                let vertical = Math.random() < 0.5;
                let isValidSpot = false;

                while (!isValidSpot) {
                    let row = Math.floor(Math.random() * 10);
                    let col = Math.floor(Math.random() * 10);
                    if (board[row][col] === 0) {
                        gameBoardFact.PlaceShip(row, col, ship, vertical);
                        isValidSpot = true;
                    }
                }
            }
        }
    }
    return { boardShip, aiBoardShip, name, board, gameBoardFact }
}