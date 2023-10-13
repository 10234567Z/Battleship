export default function GameBoard() {
    let board = new Array(10).fill(0).map(() => new Array(10).fill(0));

    let getBoard = () => board;

    let verticalPlace = (shipLength , row , col) => {
        for (let i = 0; i < shipLength; i++) {
            board[row + i][col] = 1;
        }
    }

    let horizontalPlace = (shipLength , row , col) => {
        for (let i = 0; i < shipLength; i++) {
            board[row][col + i] = 1;
        }
    }

    let PlaceShip = (row, col, ship, vertical = true) => {
        if (vertical && board[row + ship.ships.length] !== undefined) {
            verticalPlace(ship.ships.length , row , col)
        }
        else if (!vertical && board[row][col + ship.ships.length] !== undefined) {
            horizontalPlace(ship.ships.length , row , col)
        }
    }

    return { PlaceShip, getBoard }
}