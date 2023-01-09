const colours = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"];

const btn = document.getElementById("btn");
const curColour = document.getElementById("hbgcolour");

btn.addEventListener("click", () => {
    let hex = "#";
    for (let i = 0; i < 6; i++) {
        let n = Math.floor(Math.random()*colours.length);
        hex += colours[n];
    }
    document.body.style.backgroundColor = hex;
    curColour.textContent = hex;
})