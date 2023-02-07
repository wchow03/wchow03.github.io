// This file represents a single cell and contains an image
export function labelCell(cell) {
    cell.square.style.border = "1px solid #585858";

    let cellImg = document.createElement('img');
    cellImg.style.width = "100%";
    cellImg.style.height = "100%";
    cellImg.style.display = "none";

    switch(cell.status) {
        case 0:
            cellImg.src ="./images/zero.png";
            cell.square.append(cellImg);
            break;
        case 1:
            cellImg.src = "./images/one.png";
            cell.square.append(cellImg);
            break;
        case 2:
            cellImg.src = "./images/two.png";
            cell.square.append(cellImg);
            break;
        case 3:
            cellImg.src = "./images/three.png";
            cell.square.append(cellImg);
            break;
        case 4:
            cellImg.src = "./images/four.png";
            cell.square.append(cellImg);
            break;
        case 5:
            cellImg.src = "./images/five.png";
            cell.square.append(cellImg);
            break;
        case 6:
            cellImg.src = "./images/six.png";
            cell.square.append(cellImg);
            break;
        case 7:
            cellImg.src = "./images/seven.png";
            cell.square.append(cellImg);
            break;
        case 8:
            cellImg.src = "./images/eight.png";
            cell.square.append(cellImg);
            break;
    }
}