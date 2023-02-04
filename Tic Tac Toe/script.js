const cells = document.querySelectorAll(".cell");
const mainText = document.querySelector(".main-text");
const winningConditions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [0,4,8],
    [2,4,6]];

let curBoard = ["", "", "", "", "", "", "", "", ""];
let turn = "X";
let i = 0;
let gameFinished = false;

init();

function init() {
    cells.forEach(cell => cell.addEventListener("click", cellClicked));
}

function cellClicked() {
    if (!gameFinished) {
        const cellIndex = this.getAttribute("data-index");
        if (curBoard[cellIndex] == "") {
            updateCell(this, cellIndex);
        }
    }
}

function updateCell(cell, index) {
    cell.textContent = turn;
    curBoard[index] = turn;
    checkWinner();
    changeTurn();
}

function changeTurn() {
    if (turn == "X") {
        turn = "O";
    } else {
        turn = "X";
    }
    mainText.textContent = `${turn}'s turn`;
}

function checkWinner() {
    // If winning condition of one entry indexes match all curBoard indexs
    // There is a win.
    let turnCheck;

    if (turn == "X") {
        turnCheck = "X";
    } else {
        turnCheck = "O";
    }

    for (let i = 0; i < winningConditions.length; i++) {
        let i1 = winningConditions[i][0];
        let i2 = winningConditions[i][1];
        let i3 = winningConditions[i][2];
        if ((curBoard[i1] == turnCheck) && (curBoard[i2] == turnCheck) && (curBoard[i3] == turnCheck)) {
            // console.log(turnCheck + " wins!");
            mainText.textContent = `${turn} wins!`;
            gameFinished = true;
        }
    }

    if (!curBoard.includes("")) {
        mainText.textContent = "Draw";
        gameFinished = true;
    }

    if (gameFinished) {
        removeListeners();
    }
}

function removeListeners() {
    cells.forEach(cell => cell.removeEventListener("click"));
}





