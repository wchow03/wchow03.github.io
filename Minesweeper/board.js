import {labelCell} from "./cell.js";
// Start with 8x8 grid of minesweeper
// Easy: 8x8, 9 mines
// Medium: 16x16, 40 mines
// Hard: 16x32: 99 mines
// Accessing array is board[y][x]
// 0 = empty square      | 1 = 1 mine  connected  | 2 = 2 mines connected | 3 = 3 mines connected | 4 = 4 mines connected  | 5 = 5 mines connected
// 6 = 6 mines connected | 7 = 7 mines connected  | 8 = 8 mines connected | flagged = true              | mine = false           | covered = true

// rows represents y
// cols represents x
let gameOver = false;
let board = []; // Contains a 2D array of cells
let mines = []; // Array of bomb positions in (x,y) coordinates


export function makeBoard(rows, cols) {
    // 2D array of divs each with an (x,y) pair
    for (let y = 0; y < rows; y++) {
        let rowArr = [];
        for (let x = 0; x < cols; x++) {
            const status = 0;
            const square = document.createElement('div');
            const cell = {square, x, y, status, flagged: false, covered: true, mine: false};
            rowArr.push(cell);
        }
        board.push(rowArr);
    }
    // console.log("MINESWEEPER");
    createMines(99, rows, cols);
    numberCells(rows, cols);
    return board;
}

function createMines(numMines, rows, cols) {

    for (let i = 0; i < numMines; i++) {
        let xPos = Math.floor(Math.random() * cols);
        let yPos = Math.floor(Math.random() * rows);
        // console.log(`(${xPos}, ${yPos})`);
        let curCell = board[yPos][xPos];
        if (curCell.mine == false) {
            curCell.mine = true;
            let bomb = document.createElement('img');
            bomb.src = "./images/bomb.png";
            bomb.style.width = "100%";
            bomb.style.height = "100%";
            bomb.style.display = "none";
            curCell.square.append(bomb);
            mines.push(curCell);
        } else {
            i--;
        }
    }
}

// =========================================================================================================

function numberCells(rows, cols) {
    // CASE 1: square on first row
    // CASE 2: square on last row
    // CASE 3: square first col
    // CASE 4: square on last col
    // CASE 5: square anywhere but edges
    // First two cases check for corner boundaries
    numberCellsFirstCol(rows);
    numberCellsLastCol(cols, rows);
    numberCellsFirstRow(cols);
    numberCellsLastRow(cols, rows);

    for (let y = 1; y < rows-1; y++) {
        for (let x = 1; x < cols-1; x++) {
            let curCell = board[y][x];
            if (curCell.mine == false) {
                numberCell(curCell, x, y);
            }
        }
    }
}

function numberCellsFirstRow(cols) {
    for (let x = 1; x < cols-1; x++) {
        let curCell = board[0][x];
        if (curCell.mine == false) {
            let count = 0;
            if (board[0][x-1].mine == true) count++;
            if (board[1][x-1].mine == true) count++;
            if (board[1][x].mine == true) count++;
            if (board[1][x+1].mine == true) count++;
            if (board[0][x+1].mine == true) count++;
            curCell.status = count;
            labelCell(curCell);
        }
    }
}

function numberCellsLastRow(cols, rows) {
    for (let x = 1; x < cols-1; x++) {
        let curCell = board[rows-1][x];
        if (curCell.mine == false) {
            let count = 0;
            if (board[rows-1][x-1].mine == true) count++;
            if (board[rows-1][x+1].mine == true) count++;
            if (board[rows-2][x-1].mine == true) count++;
            if (board[rows-2][x].mine == true) count++;
            if (board[rows-2][x+1].mine == true) count++;
            curCell.status = count;
            labelCell(curCell);
        }
    }
}

function numberCellsFirstCol(rows) {
    for (let y = 0; y < rows; y++) {
        let curCell = board[y][0];
        if (curCell.mine == false) {
            let count = 0;
            if (y == 0) {
                if (board[1][0].mine == true) count++;
                if (board[1][1].mine == true) count++;
                if (board[0][1].mine == true) count++;
            }
            else if (y == rows-1) {
                if (board[rows-2][0].mine == true) count++;
                if (board[rows-2][1].mine == true) count++;
                if (board[rows-1][1].mine == true) count++;
            } else {
                if (board[y-1][0].mine == true) count++;
                if (board[y-1][1].mine == true) count++;
                if (board[y][1].mine == true) count++;
                if (board[y+1][1].mine == true) count++;
                if (board[y+1][0].mine == true) count++;
            }
            curCell.status = count;
            labelCell(curCell);
        }
    }
}

function numberCellsLastCol(cols, rows) {
    for (let y = 0; y < rows; y++) {
        let curCell = board[y][cols-1];
        if (curCell.mine == false) {
            let count = 0;
            if (y == 0) {
                if (board[1][cols-2].mine == true) count++;
                if (board[1][cols-1].mine == true) count++;
                if (board[0][cols-2].mine == true) count++;
            } else if (y == rows-1) {
                if (board[rows-2][cols-2].mine == true) count++;
                if (board[rows-2][cols-1].mine == true) count++;
                if (board[rows-1][cols-2].mine == true) count++;
            } else {
                if (board[y-1][cols-1].mine == true) count++;
                if (board[y-1][cols-2].mine == true) count++;
                if (board[y][cols-2].mine == true) count++;
                if (board[y+1][cols-2].mine == true) count++;
                if (board[y+1][cols-1].mine == true) count++;
            }
            curCell.status = count;
            labelCell(curCell);
        }
    }
}

function numberCell(cell) {
    let xPos = cell.x;
    let yPos = cell.y;
    let count = 0;
    for (let y = -1; y <= 1; y++) {
        for (let x = -1; x <= 1; x++) {
            let curCell = board[yPos + y][xPos + x];
            if (curCell.mine == true) {
                count++;
            }
        }
    }
    cell.status = count;
    labelCell(cell);
}

// ===========================================================================================================================

export function revealCell(cell, int) {
    if (gameOver == false) {
        if (cell.flagged == false) {
            if (cell.mine == true) {
                clearInterval(int);
                gameOver = true;
                endGame();
            } else if (cell.status == 0) {
                cell.square.querySelector("img").style.display = "block";
                cell.covered = false;
                revealNeighbors(cell);
            } else if (cell.covered == false) {
                checkFlagged(cell);
            } else {
                cell.square.querySelector("img").style.display = "block";
                cell.covered = false;
            }
        }
}
}

// =========================================================================================================================

function revealNeighbors(cell) {
    // Guaranteed that we clicked a cell with status 0

    // If any adjacent cell has a status of 0 add that cell to queue and continue, 
    // otherwise reveal all adjacent numbers
    let xPos = cell.x;
    let yPos = cell.y;

    // Recursion:
        // Base cases:
            // If cell adjacent does not have status 0 and the cell is covered then stop
        // Check to see if any adjacent cells have a status of 0 and covered == true
            // If they do, then call revealNeighbors with that adjacent cell
            // Otherwise reveal the adjacent cell
    if (cell.status != 0 && cell.covered == true) {
        cell.covered = false;
        cell.square.querySelector("img").style.display = "block";
    } else {
        for (let y = -1; y <= 1; y++) {
            for (let x = -1; x <= 1; x++) {
                let curCell = board[yPos + y]?.[xPos + x];
                if ((curCell?.status == 0) && (curCell.covered == true)) {
                    curCell.covered = false;
                    revealNeighbors(curCell);
                } else if (curCell?.mine == false) {
                    curCell.square.querySelector("img").style.display = "block";
                    curCell.covered = false;
                }
            }
        }
    }
}

function checkFlagged(cell) {
    let xPos = cell.x;
    let yPos = cell.y;
    let curStatus = cell.status;
    let minesFlagged = 0;
    let neighbors = [];
    let wrongFlag = false;

    for (let y = -1; y <= 1; y++) {
        for (let x = -1; x <= 1; x++) {
            let curCell = board[yPos + y]?.[xPos + x];
            if (curCell?.flagged == true && curCell.mine == false) {
                wrongFlag = true;
                minesFlagged++;
            }
            if (curCell?.flagged == true && curCell.mine == true && curCell.covered == true) {
                minesFlagged++;
            } else {
                neighbors.push(curCell);
            }
        }
    }

    if (curStatus == minesFlagged) {
        if (wrongFlag) {
            gameOver = true;
            endGame();
        }
        cell.covered = false;
        neighbors.forEach(cell => {
            if (cell) {
                if (cell.status == 0) {
                    cell.covered = false;
                    revealNeighbors(cell);
                } else {
                    cell.square.querySelector("img").style.display = "block";
                    cell.covered = false;
                }
            }
        });
    }

}

function endGame() {
    mines.forEach(cell => {
        if (cell.flagged == true) {
            cell.square.querySelector(".flag").remove();
            cell.flagged = false;
        }
        cell.square.querySelector("img").style.display = "block";
    });

    board.forEach(row => {
        row.forEach(cell => cell.square.removeEventListener("mousedown", (e) => {
            e.covered = true;
        }));
    });
}

// ============================================================================================

export function flagCell(cell) {

    if (gameOver == false) {

        if (cell.covered == true) {
            if (cell.flagged == false) {
                let cellImg = document.createElement("img");
                cellImg.className = "flag";
                cellImg.src = "./images/flag.png";
                cellImg.style.width = "100%";
                cellImg.style.height = "100%";
                cell.square.append(cellImg);
                cell.flagged = true;
                return true;
            } else {
                let curFlag = cell.square.querySelector(".flag");
                curFlag.remove();
                cell.flagged = false;
                return false;
            }
        }
    }
}

export function resetBoard(rows, cols) {
    // reset all status, mines, flagged, covered
    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
            let cell = board[y][x];
            if (cell.flagged == true) {
                cell.square.querySelector(".flag").remove();
            }
            cell.status = 0;
            cell.mine = false;
            cell.flagged = false;
            cell.covered = true;
            cell.square.querySelector("img").remove();
        }
    }
    gameOver = false;
    mines = [];
    createMines(99, rows, cols);
    numberCells(rows, cols);
}
