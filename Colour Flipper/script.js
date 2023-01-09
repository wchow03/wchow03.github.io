const colours = ["#FFD4CC", "rgb(102,255,230)", "#E6E600", "rgb(196,77,255)", "#0088CC", "#B3B3FF", "#BBFF33"];

const curColour = document.getElementById("bgcolour");
const button = document.getElementById("btn");
button.addEventListener("click", () => {
    let colour = colours[Math.floor(Math.random()*colours.length)];
    document.body.style.backgroundColor = colour;
    curColour.textContent = colour;
})