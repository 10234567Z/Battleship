import makeUI from "./gameStart";

export default function GameBoard() {
    let board = new Array(10).fill(0).map(() => new Array(10).fill(0));

    /** public function to return board */
    let getBoard = () => board;

    let shipsBoarded = [];

    /** Place ship vertically on board , and call backtracking if ship already exists on the path */
    let verticalPlace = (shipLength, row, col, ship) => {
        let tempBackTrack;
        let ending = 0;
        let coords = [];
        for (let i = 0; i < shipLength; i++) {
            if (board[row + i][col] === 0) {
                board[row + i][col] = 1;
                ending++
                coords.push([row + i, col])

            }
            else {
                tempBackTrack = i - 1;
                backTrackVertical(tempBackTrack, row, col);
                break;
            }
        }
        if (ending === shipLength && coords.length === shipLength) {
            shipsBoarded.push({ ship: ship.ships, coordinates: coords })
        }
    }

    /** Place ship horizontally on board , and call backtracking if ship already exists on the path */
    let horizontalPlace = (shipLength, row, col, ship) => {
        let tempBackTrack;
        let ending = 0;
        let coords = []
        for (let i = 0; i < shipLength; i++) {
            if (board[row][col + i] === 0) {
                board[row][col + i] = 1;
                ending++
                coords.push([row, col + i])
            }
            else {
                tempBackTrack = i - 1;
                backTrackHorizontal(tempBackTrack, row, col);
                break;
            }
        }
        if (ending === shipLength && coords.length === shipLength) {
            shipsBoarded.push({ ship: ship.ships, coordinates: coords })
        }
    }

    /** Checks if the position is valid or not and then based on vertical parameter value , call the suitable function to place it */
    let PlaceShip = (row, col, ship, vertical = true) => {
        if (board[row] !== undefined && board[row][col] !== undefined) {
            if (vertical && board[row + ship.ships.length] !== undefined) {
                verticalPlace(ship.ships.length, row, col, ship)
            }
            else if (!vertical && board[row][col + ship.ships.length] !== undefined) {
                horizontalPlace(ship.ships.length, row, col, ship)
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


    let recieveAttack = (row, col , enemyBoard) => {

        /** Check if its a valid coordinate to hit and not being hit before */
        if (board[row] !== undefined && board[row][col] !== undefined && board[row][col] !== 'hit') {
            if (board[row][col] === 1) {
                board[row][col] = 'hit';
                let hitShip = shipsBoarded.filter((ship) => ship.coordinates.some(coord => coord[0] === row && coord[1] === col));
                hitShip[0].ship.hit();
                hitShip[0].ship.isSunk();
                updateGame(hitShip[0].ship);
            }
            else if (board[row][col] === 0) {
                board[row][col] = 'miss'
            }
        }
        return endGame(enemyBoard)
    }

    /** Update the boarded ships */
    let updateGame = (ship) => {
        if (ship.sunk) {
            let index = shipsBoarded.findIndex((s) => ship === s.ship)
            shipsBoarded.splice(index, 1);
        }
    }

    /** End game if gameboard's all boarded ships are down */
    let endGame = (enemyBoard) => {
        if (shipsBoarded.length === 0) {
            let name = "You"
            if(enemyBoard.name !== "Computer"){
                name = "Computer"
            }
            document.querySelector('.container').innerHTML = `
            The winner is ${name} against ${enemyBoard.name}
            <div class=\"playAgain\">Play Again</div>
            `;
            document.querySelector('.playAgain').addEventListener('click' , () => {
                makeUI();
            })
        }

        return "Still ongoing"
    }
    return { PlaceShip, getBoard, recieveAttack, shipsBoarded }
}