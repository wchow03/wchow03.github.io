// Making navbar dark when scrolling past the intro screen

changeNavBarColor();

function changeNavBarColor() {
    const navbar = document.querySelector(".navbar");

    window.onscroll = function() {
        let top = window.scrollY;
        if (top >= 650) {
            navbar.classList.add("bg-dark");
        } else {
            navbar.classList.remove("bg-dark");
        }
    };
}
// ===========================================================================
// Using an Intersection Observer to reveal elements on scroll

revealElementsOnScroll();

function revealElementsOnScroll() {

    const hiddenElems = document.querySelectorAll(".hidden");

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
                entry.target.classList.remove("hidden");
            }
        })
    },
    {
        threshold: 0.6,
    });

    hiddenElems.forEach(elem => {
        observer.observe(elem);
    })
}
// ===========================================================================
animateProgressBar();

function animateProgressBar() {
    const skills = document.querySelectorAll(".progress");
    const skillContainer = document.querySelector(".skill-container");

    const skillObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    skills.forEach(skill => {
                        skill.classList.add("active");
                    });
                }
            })
        },
        {
            threshold: 1
        });

    skillObserver.observe(skillContainer);
}
// ===========================================================================
// Adding text animation to intro screen
const myIntro = "i'm William";
let curLetter = 0;

setInterval(() => {
    if (curLetter <= myIntro.length)
    text.textContent = myIntro.substring(0, curLetter);
    curLetter++;
}, 120);
// ===========================================================================
textAnimation("I'm William");

function textAnimation(text) {
    const textEffect = document.querySelector(".text-effect");
    const textBar = document.querySelector(".text-bar");
    let visible = true;
    let length = 0;
    let dir = 1; // 1 indicates forward and -1 indicates backwards
    // If current length is 0 go forward with substring
    // If current length is length of text go backward with substring
    setInterval(() => {
        if (length === 0) {
            setTimeout(() => {
                dir = 1;
            }, 400);
        } else if (length === text.length) {
            setTimeout(() => {
                dir = -1;
            }, 500);
        }
        textEffect.textContent = text.substring(0, length);
        length += dir;
    }, 200);

    setInterval(() => {
        if (visible) {
            textBar.classList.add("hideBar");
            visible = false;
        } else {
            textBar.classList.remove("hideBar");
            visible = true;
        }
    }, 450);
}
