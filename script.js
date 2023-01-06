const navbar = document.querySelector(".navbar");

window.onscroll = function() {
    let top = window.scrollY;
    if (top >= 900) {
        navbar.classList.add("bg-dark");
    } else {
        navbar.classList.remove("bg-dark");
    }
};