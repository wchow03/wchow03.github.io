var ready = (callback) => {
    if (document.readyState != "loading") callback();
    else document.addEventListener("DOMContentLoaded", callback);
};

ready(() => {
    document.querySelector(".bgimg").style.height = window.innerHeight + "px";
});