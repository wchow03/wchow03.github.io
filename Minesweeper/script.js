import {makeBoard, revealCell, flagCell, resetBoard, checkWin, createMines} from "./board.js";

// AFTER COMPLETING WORKING GAME MAKE IT SUCH THAT FIRST CLICK ON BOARD IS A BLANK SQUARE
let restart = document.querySelector(".restartBtn");
let minesRemaining = document.querySelector(".mines-remaining");
let timeTaken = document.querySelector(".time-taken");
let easy = document.querySelector(".easy");
let medium = document.querySelector(".medium");
let hard = document.querySelector(".hard");

let rows = 16;
let cols = 32;
let mode = "hard";
let firstClick = false;

let mines;
let time = 0;
let timerStarted = false;
let board;
let curBoard = document.querySelector(".board");
let int;


initMines();
init();

window.addEventListener("contextmenu", e => {
    e.preventDefault();
    
});

easy.addEventListener("click", () => {
    rows = 8;
    cols = 8;
    mode = "easy";
    reset();
});

medium.addEventListener("click", () => {
    rows = 16;
    cols = 16;
    mode = "medium";
    reset();
});

hard.addEventListener("click", () => {
    rows = 16;
    cols = 32;
    mode = "hard";
    reset();
});

restart.addEventListener("click", () => {
    reset();
});

function init() {
    board = makeBoard(rows, cols);
    
    curBoard.style.setProperty("--col", cols);
    curBoard.style.setProperty("--row", rows);
    board.forEach(row => {
        row.forEach(cell => {
            curBoard.append(cell.square);
            
            cell.square.addEventListener("mousedown", e => {
                // console.log(`(${cell.x}, ${cell.y})`);
                if (firstClick == false) {
                    firstClick = true;
                    if (cols == 8) {
                        createMines(9, rows, cols, cell);
                    } else if (cols == 16) {
                        createMines(40, rows, cols, cell);
                    } else if (cols == 32) {
                        createMines(99, rows, cols, cell);
                    }
                }
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
                        updateMinesLeft();
                        break;
                }
            });
        });
    });
}

function reset() {
    clearInterval(int);
    timeTaken.textContent = "000";
    time = 0;
    timerStarted = false;
    firstClick = false;
    restart.style.background = "url(./images/Smiley.png)";
    restart.style.backgroundSize = "40px 40px";
    while (curBoard.firstChild) curBoard.removeChild(curBoard.firstChild);
    board = [];
    initMines();
    updateMinesLeft();
    resetBoard();
    init();
}

function initMines() {
    if (mode == "easy") {
        mines = 9;
    } else if (mode == "medium") {
        mines = 40;
    } else if (mode == "hard") {
        mines = 99;
    }
    updateMinesLeft();
}

function updateMinesLeft() {
    if (mines < 10) {
        minesRemaining.textContent = "00"+mines;
    } else if (mines < 100) {
        minesRemaining.textContent = "0"+mines;
    }
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





