import getElement from "./utils/getElement.js";

const cards = getElement(".cards");

cards.addEventListener("click", (e) => {
    console.log(e.target.classList);
});
