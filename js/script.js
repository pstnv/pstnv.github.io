import getElement from "./utils/getElement.js";
import addCopyrightToFooter from "./utils/addCopyrightToFooter.js";
import animateStudyNow from "./utils/animateStudyNow.js";

window.addEventListener("DOMContentLoaded", () => {
    // добавить copyright в футер
    addCopyrightToFooter();
    // однократно анимировать текст ("В настоящее время я изучаю...")
    animateStudyNow();
});

// инициализируем анимацию AOS
import AOSConfig from "./utils/AOSconfig.js";
AOS.init(AOSConfig);

// повторно анимировать текст ("В настоящее время я изучаю...") при переходе к разделу Обо мне
const aboutLink = getElement("#aboutLink");
aboutLink.addEventListener("click", animateStudyNow);

const cards = document.querySelectorAll(".card");

// подслушка на "Подробнее". При нажатии - открываем описание (cardBack)
cards.forEach((card) => {
    card.querySelector(".moreInfo").addEventListener("click", () => {
        showFrontCard();
        card.querySelector(".cardBack").style.display = "block";
        // ставим таймер: даст задержку исполнения
        setTimeout(() => {
            card.querySelector(".cardBack").classList.add("backgroundEnd");
            card.querySelector(".headerFront").classList.add(
                "headerFrontHidden"
            );
        }, 0);
        setTimeout(() => {
            card.querySelector(".cardBackText").style.display = "flex";
        }, 500);
    });
});

function showFrontCard() {
    cards.forEach((card) => {
        card.querySelector(".headerFront").classList.remove(
            "headerFrontHidden"
        );
        card.querySelector(".cardBackText").style.display = "none";
        card.querySelector(".cardBack").classList.remove("backgroundEnd");
        card.querySelector(".cardBack").style.display = "none";
    });
}

// подслушка на окно. При нажатии на любое место, кроме "Подробнее" и "Открыть сайт" - закрывается карточка
window.addEventListener("click", (event) => {
    if (
        !event.target.classList.contains("moreInfo") &
        !event.target.classList.contains("linkVisit")
    ) {
        showFrontCard();
    }
});

// если пользователь кликнул на отправку формы, при переходе со страницы форма будет очищена
const form = getElement("form");
form.addEventListener("submit", () => {
    window.addEventListener("unload", () => {
        form.reset();
    });
});

// scroll в начало страницы
const linkHome = getElement(".linkHome");
linkHome.addEventListener("click", () => {
    // event.preventDefault();
    window.scrollTo({ top: 0 }) ||
        document.documentElement.scrollTo({ top: 0 });
});
