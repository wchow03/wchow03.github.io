import {makeBoard, revealCell, flagCell} from "./board.js";

let rows = 16;
let cols = 32;
// AFTER COMPLETING WORKING GAME MAKE IT SUCH THAT FIRST CLICK ON BOARD IS A BLANK SQUARE
const board = makeBoard(rows, cols);

const curBoard = document.querySelector(".board");

curBoard.style.setProperty("--col", cols);
curBoard.style.setProperty("--row", rows);

window.addEventListener("contextmenu", e => {
    e.preventDefault();
});

board.forEach(row => {
    row.forEach(cell => {
        curBoard.append(cell.square);

        cell.square.addEventListener("mousedown", e => {
            console.log(`(${cell.x}, ${cell.y})`);
            switch (e.button) {
                case 0:
                    revealCell(cell, cols, rows);
                    break;
                case 2:
                    flagCell(cell);
                    break;
            }
        });

    });
})

console.log(board);




