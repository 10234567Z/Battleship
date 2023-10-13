export default function GameBoard() {
    let board = new Array(10).fill(0).map(() => new Array(10).fill(0));

    let getBoard = () => board;

    let verticalPlace = (shipLength, row, col) => {
        let tempBackTrack;
        for (let i = 0; i < shipLength; i++) {
            if (board[row + i][col] === 0) {
                board[row + i][col] = 1;
            }
            else {
                tempBackTrack = i - 1;
                backTrackVertical(tempBackTrack, row, col);
                break;
            }
        }
    }

    let horizontalPlace = (shipLength, row, col) => {
        let tempBackTrack;
        for (let i = 0; i < shipLength; i++) {
            if(board[row][col + i] === 0){
                board[row][col + i] = 1;
            }
            else{
                tempBackTrack = i - 1;
                backTrackHorizontal(tempBackTrack , row , col);
                break;
            }
        }
    }

    let PlaceShip = (row, col, ship, vertical = true) => {
        if (vertical && board[row + ship.ships.length] !== undefined) {
            verticalPlace(ship.ships.length, row, col)
        }
        else if (!vertical && board[row][col + ship.ships.length] !== undefined) {
            horizontalPlace(ship.ships.length, row, col)
        }
    }

    let backTrackVertical = (index, row, col) => {
        for (let i = index; i >= 0; i--) {
            board[row + i][col] = 0;
        }
    }

    let backTrackHorizontal = (index, row, col) => {
        for (let i = index; i >= 0; i--) {
            board[row][col + i] = 0;
        }
    }

    return { PlaceShip, getBoard }
}