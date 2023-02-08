import {makeBoard, revealCell, flagCell, resetBoard, checkWin} from "./board.js";

// AFTER COMPLETING WORKING GAME MAKE IT SUCH THAT FIRST CLICK ON BOARD IS A BLANK SQUARE
const restart = document.querySelector(".restartBtn");
let minesRemaining = document.querySelector(".mines-remaining");
let timeTaken = document.querySelector(".time-taken");

let rows = 16;
let cols = 32;

let mines = 99;
let time = 0;
let timerStarted = false;
let board;
let curBoard;
let int;

window.addEventListener("contextmenu", e => {
    e.preventDefault();
});

init();

minesRemaining.textContent = "0"+mines;

restart.addEventListener("click", () => {
    clearInterval(int);
    mines = 99;
    minesRemaining.textContent = "099";
    time = 0;
    timerStarted = false;
    timeTaken.textContent = "000";
    resetBoard(rows, cols);

});

function init() {

    board = makeBoard(rows, cols);
    curBoard = document.querySelector(".board");
    
    curBoard.style.setProperty("--col", cols);
    curBoard.style.setProperty("--row", rows);
    board.forEach(row => {
        row.forEach(cell => {
            curBoard.append(cell.square);

            cell.square.addEventListener("mousedown", e => {
                console.log(`(${cell.x}, ${cell.y})`);
                switch (e.button) {
                    case 0:
                        if (timerStarted == false) {
                            timerStarted = true;
                            int = setInterval(incrTimer, 1000);
                        }
                        revealCell(cell, int);
                        checkWin(cols, rows, int);
                        break;
                    case 2:
                        mines = flagCell(cell, mines);
                        checkWin(cols, rows, int);
                        minesRemaining.textContent = "0"+mines;
                        break;
                }
            });

        });
    })
}

function incrTimer() {
    time++;

    if (time <= 999) {
        if (time < 10) {
            timeTaken.textContent = "00"+time;
        } else if (time < 100) {
            timeTaken.textContent = "0"+time;
        } else {
            timeTaken.textContent = time;
        }
    }
}





