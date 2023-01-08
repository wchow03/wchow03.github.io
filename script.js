const navbar = document.querySelector(".navbar");

window.onscroll = function() {
    let top = window.scrollY;
    if (top >= 650) {
        navbar.classList.add("bg-dark");
    } else {
        navbar.classList.remove("bg-dark");
    }
};

// Using an Intersection Observer to reveal elements on scroll

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