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

    let aiAttack = (enemyBoard) => {
        if (isAI) {
            if (enemyBoard.gameBoardFact.shipsBoarded.length <= 5 && enemyBoard.gameBoardFact.shipsBoarded.length > 0 ) {
                let eBoard = enemyBoard.gameBoardFact.getBoard();
                let isValidSpot = false;

                while (!isValidSpot) {
                    let row = Math.floor(Math.random() * 10)
                    let col = Math.floor(Math.random() * 10)
                    if (eBoard[row][col] == 0 || eBoard[row][col] == 1) {
                        isValidSpot = true;
                        enemyBoard.gameBoardFact.recieveAttack(row, col , enemyBoard);
                    }
                }
            }
        }
    }

    let random = () => {
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

    let attack = (row, col, enemyBoard) => {
        if (enemyBoard.gameBoardFact.shipsBoarded.length <= 5 && enemyBoard.gameBoardFact.shipsBoarded.length > 0 ) {
            enemyBoard.gameBoardFact.recieveAttack(row, col , enemyBoard);
            return "All good on western front"
        }
        else {
            return "Place all the ships on your board before starting the attack"
        }
    }
    return { boardShip, aiBoardShip, attack, aiAttack,random, name, board, gameBoardFact }
} 