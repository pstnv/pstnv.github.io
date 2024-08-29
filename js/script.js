import getElement from "./utils/getElement.js";
import addCopyrightToFooter from "./utils/addCopyrightToFooter.js";
import animateStudyNow from "./utils/animateStudyNow.js";
import clearForm from "./utils/clearForm.js";

// инициализируем анимацию AOS
import AOSConfig from "./utils/AOSconfig.js";
AOS.init(AOSConfig);

window.addEventListener("DOMContentLoaded", () => {
    // добавить copyright в футер
    addCopyrightToFooter();
    // однократно анимировать текст ("В настоящее время я изучаю...")
    animateStudyNow();
});

// повторно анимировать текст ("В настоящее время я изучаю...") при переходе к разделу Обо мне
const aboutLink = getElement("#aboutLink");
aboutLink.addEventListener("click", animateStudyNow);

const cards = document.querySelectorAll(".card");
cards.forEach((card) => {
    card.addEventListener("click", (e) => {
        const moreInfo = e.target.classList.contains("moreInfo");
        if (moreInfo) {
            // отобразить все карточки лицевой стороной
            displayCardsFrontSide();
            // отобразить выбранную карту тыльной стороной
            card.classList.remove("displayFrontCard");
            // ставим таймер: даст задержку исполнения на плавный фон
            setTimeout(() => {
                const cardBack = card.querySelector(".cardBack");
                cardBack.classList.add("background-fade");
            }, 0);
        }
    });
});

function displayCardsFrontSide() {
    cards.forEach((card) => {
        // закрыть карту
        card.classList.add("displayFrontCard");
        const cardBack = card.querySelector(".cardBack");
        cardBack.classList.remove("background-fade");
    });
}

// подслушка на окно. При нажатии на любое место, кроме "Подробнее" и "Открыть сайт" - закрывается карточка
window.addEventListener("click", (e) => {
    const card = e.target.closest(".card");
    if (!card) {
        displayCardsFrontSide();
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
