import {
    addCopyrightToFooter,
    AOSConfig, // конфигурация анимации
    animateStudyNow,
    getElement,
    clearForm,
    displayCardBackSide,
    handleDisplayAllCardsFront,
    scrollToTop,
} from "./utils/index.js";

window.addEventListener("DOMContentLoaded", () => {
    // добавить copyright в футер
    addCopyrightToFooter();
    // инициализируем анимацию AOS (срабатывает при startEvent: "DOMContentLoaded")
    AOS.init(AOSConfig);
    // однократно анимировать текст ("В настоящее время я изучаю...")
    animateStudyNow();
});

// повторно анимировать текст ("В настоящее время я изучаю...") при переходе к разделу Обо мне
const aboutLink = getElement("#aboutLink");
aboutLink.addEventListener("click", animateStudyNow);

// отобразить описание карточки (при клике по ней)
const cards = document.querySelectorAll(".card");
cards.forEach(displayCardBackSide);

// поддерживать закрытое сотояние карточек
// закрывать карточку при нажатии на любое другое место
window.addEventListener("click", handleDisplayAllCardsFront);

// если пользователь кликнул на отправку формы, при переходе со страницы форма будет очищена
const form = getElement("form");
form.addEventListener("submit", clearForm);

// при клике по стрелке - scroll в начало страницы
const linkHome = getElement(".linkHome");
linkHome.addEventListener("click", scrollToTop);
