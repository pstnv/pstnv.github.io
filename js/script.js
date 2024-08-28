import getElement from "./utils/getElement.js";

window.addEventListener("DOMContentLoaded", () => {
    addCopyrightToFooter();
    techsAnimate();
});

// добавить copyright в футер
const footer = getElement(".parFooter");
function addCopyrightToFooter() {
    const today = new Date();
    const year = today.getFullYear();
    footer.textContent = `© ${year} @irinapstnv`;
}

// инициализируем анимацию AOS
AOS.init({
    // Global settings:
    disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
    startEvent: "DOMContentLoaded", // name of the event dispatched on the document, that AOS should initialize on
    initClassName: "aos-init", // class applied after initialization
    animatedClassName: "aos-animate", // class applied on animation
    useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
    disableMutationObserver: false, // disables automatic mutations' detections (advanced)
    debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
    throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)

    // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
    offset: 0, // offset (in px) from the original trigger point
    delay: 0, // values from 0 to 3000, with step 50ms
    duration: 500, // values from 0 to 3000, with step 50ms
    easing: "ease", // default easing for AOS animations
    once: true, // whether animation should happen only once - while scrolling down
    mirror: false, // whether elements should animate out while scrolling past them
    anchorPlacement: "top-center", // defines which position of the element regarding to window should trigger the animation
});

// анимировать текст ("В настояще время я изучаю...")
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
