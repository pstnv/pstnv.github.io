import getElement from "./utils/getElement.js";
import addCopyrightToFooter from "./utils/addCopyrightToFooter.js";
import animateStudyNow from "./utils/animateStudyNow.js";
import clearForm from "./utils/clearForm.js";
import {
    displayCardBackSide,
    displayAllCardsFront,
} from "./utils/displayCardSide.js";
// конфигурация анимации
import AOSConfig from "./utils/AOSConfig.js";

window.addEventListener("DOMContentLoaded", () => {
    // добавить copyright в футер
    addCopyrightToFooter();
    // однократно анимировать текст ("В настоящее время я изучаю...")
    animateStudyNow();
    // инициализируем анимацию AOS (срабатывает при startEvent: "DOMContentLoaded")
    AOS.init(AOSConfig);
});


// повторно анимировать текст ("В настоящее время я изучаю...") при переходе к разделу Обо мне
const aboutLink = getElement("#aboutLink");
aboutLink.addEventListener("click", animateStudyNow);

const cards = document.querySelectorAll(".card");
cards.forEach(displayCardBackSide);

// подслушка на окно. При нажатии на любое место, кроме "Подробнее" и "Открыть сайт" - закрывается карточка
window.addEventListener("click", (e) => {
    const card = e.target.closest(".card");
    if (!card) {
        displayAllCardsFront(cards);
    }
});

// если пользователь кликнул на отправку формы, при переходе со страницы форма будет очищена
const form = getElement("form");
form.addEventListener("submit", clearForm);

// scroll в начало страницы
const linkHome = getElement(".linkHome");
linkHome.addEventListener("click", () => {
    // event.preventDefault();
    window.scrollTo({ top: 0 }) ||
        document.documentElement.scrollTo({ top: 0 });
});
