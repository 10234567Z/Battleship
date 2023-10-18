import updateScreen from "./updateUI";

export default function attackOther(human, computer, cell) {
    let row = parseInt(cell.classList[1].slice(4, 5));
    let col = parseInt(cell.classList[1].slice(5))
    if (computer.board[row][col] == 0 || computer.board[row][col] == 1) {
        human.attack(row, col, computer.gameBoardFact);
        computer.aiAttack(human.gameBoardFact);
        if (document.querySelector(".humanB") !== null) {
            updateScreen(human.board, computer.board)
        }
    }
}