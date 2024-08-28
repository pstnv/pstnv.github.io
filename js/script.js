import getElement from "./utils/getElement.js";
import addCopyrightToFooter from "./utils/addCopyrightToFooter.js";

window.addEventListener("DOMContentLoaded", () => {
    // добавить copyright в футер
    addCopyrightToFooter();
    techsAnimate();
});

// инициализируем анимацию AOS
import AOSConfig from "./utils/AOSconfig.js";
AOS.init(AOSConfig);

// анимировать текст ("В настоящее время я изучаю...")
const studyNowSpanClass = ".studyNowSpan";
const studyNowSpan = getElement(studyNowSpanClass);
function techsAnimate() {
    studyNowSpan.textContent = "";
    gsap.to(studyNowSpanClass, {
        scrollTrigger: studyNowSpanClass,
        text: "Node.JS, Express.",
        delay: 0.6,
        duration: 3,
        stagger: 0.5,
        ease: "power1",
        // repeat: -1,
        // repeatDelay: -5
    });
}

const aboutLink = getElement("#aboutLink");
aboutLink.addEventListener("click", techsAnimate);

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
const btnSubmit = getElement("#submit");
btnSubmit.addEventListener("click", () => {
    window.addEventListener("unload", () => {
        resetForm();
    });
});

//функция очистки полей
function resetForm() {
    getElement(".formStyle").reset();
}

// scroll в начало страницы
const linkHome = getElement(".linkHome");
linkHome.addEventListener("click", () => {
    // event.preventDefault();
    window.scrollTo({ top: 0 }) ||
        document.documentElement.scrollTo({ top: 0 });
});
