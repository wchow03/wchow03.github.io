const navbar = document.querySelector(".navbar");
const skills = document.querySelector(".progress");

window.onscroll = function() {
    let top = window.scrollY;
    if (top >= 650) {
        navbar.classList.add("bg-dark");
    } else {
        navbar.classList.remove("bg-dark");
    }
};



