export default function GameBoard() {
    let board = new Array(10).fill(0).map(() => new Array(10).fill(0));

    /** public function to return board */
    let getBoard = () => board;


    /** Place ship vertically on board , and call backtracking if ship already exists on the path */
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

    /** Place ship horizontally on board , and call backtracking if ship already exists on the path */
    let horizontalPlace = (shipLength, row, col) => {
        let tempBackTrack;
        for (let i = 0; i < shipLength; i++) {
            if (board[row][col + i] === 0) {
                board[row][col + i] = 1;
            }
            else {
                tempBackTrack = i - 1;
                backTrackHorizontal(tempBackTrack, row, col);
                break;
            }
        }
    }

    /** Checks if the position is valid or not and then based on vertical parameter value , call the suitable function to place it */
    let PlaceShip = (row, col, ship, vertical = true) => {
        if ( board[row] !== undefined && board[row][col] !== undefined) {
            if (vertical && board[row + ship.ships.length] !== undefined) {
                verticalPlace(ship.ships.length, row, col)
            }
            else if (!vertical && board[row][col + ship.ships.length] !== undefined) {
                horizontalPlace(ship.ships.length, row, col)
            }
        }
    }

    /**
     * both of the backTrack down here , takes the index value from where afterward another ship was there then start backtracking
     * until index is 0 and board is reset to what its previous state was
     */
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