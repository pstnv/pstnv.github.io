// скрыть часть карточек при ширине экрана меньше 800px
let hiddenCards = [];
const showCards = document.querySelector(".showCards");
let lastWidth = window.innerWidth;
let elementOffset = showCards.offsetTop;
let expanded = false;
const hideCardsBtn = document.querySelector(".hideCards");

window.addEventListener("DOMContentLoaded", () => {
    hiddenCards = document.querySelectorAll(".order");
    if (!hiddenCards.length) {
        return;
    }
    checkWidth();
});

window.addEventListener("resize", () => {
    hiddenCards = document.querySelectorAll(".order");
    if (!hiddenCards.length) {
        return;
    }
    if (window.innerWidth !== lastWidth) {
        checkWidth();
    }
    lastWidth = window.innerWidth;
});

function checkWidth() {
    if (lastWidth <= 800 && expanded === true) {
    }
    // 1 случай
    else if (lastWidth <= 800 && expanded === false) {
        hiddenCards.forEach((card) => {
            // 1. если экран меньше 800px, скрываем часть карточек
            // expanded = false;
            card.style.order = "1";
            card.style.display = "none";
        });
        // и отображаем контейнер - "Отобразить скрытые"
        showCards.style.display = "flex";

        //2. ставим подслушку на контейнер - при нажатии отображать скрытые карточки
        // и скрывать контейнер - "Отобразить скрытые"
        // и отображать контейнер - "Скрыть"
        showCards.addEventListener("click", () => {
            expanded = true;
            hiddenCards.forEach((card) => {
                card.style.display = "block";
            });
            showCards.style.display = "none";
            hideCardsBtn.style.display = "flex";
            hideCardsBtn
                .querySelector(".figureArrow")
                .classList.add("scalefigureArrow");
        });

        hideCardsBtn.addEventListener("click", () => {
            // expanded = false;
            hiddenCards.forEach((card) => {
                card.style.display = "none";
            });
            showCards.style.display = "flex";
            hideCardsBtn.style.display = "none";
            hideCardsBtn
                .querySelector(".figureArrow")
                .classList.remove("scalefigureArrow");

            // возвращаемся (делаем скролл вверх) до контейнера "Отобразить скрытые"
            // определяем расстояние от текущего положения до контейнера "Отобразить скрытые"
            let elementOffset = showCards.offsetTop;
            // определяем величину margin-top контейнера "Отобразить скрытые"
            const style = getComputedStyle(showCards);
            let elementMarginTop = parseInt(style.marginTop, 10);
            // делаем скролл на расстояние минус 20px на margin-top
            window.scrollTo({ top: elementOffset - elementMarginTop }) ||
                document.documentElement.scrollTo({
                    top: elementOffset - elementMarginTop,
                });
        });
    }
    // 2 случай
    else {
        expanded = false;
        // если экран больше 800px и был ранее нажат контейнер "Отобразить скрытые"
        // отображаем карточки
        hiddenCards.forEach((card) => {
            card.style.order = "initial";
            card.style.display = "block";
        });
        showCards.style.display = "none";
        hideCardsBtn.style.display = "none";
        hideCardsBtn
            .querySelector(".figureArrow")
            .classList.remove("scalefigureArrow");
    }
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

// анимация текста
function techsAnimate() {
    document.querySelector(".spanNews").textContent = "";
    gsap.to(".spanNews", {
        scrollTrigger: ".spanNews",
        text: "React, Node.JS, Redux.",
        delay: 0.6,
        duration: 3,
        stagger: 0.5,
        ease: "power1",
        // repeat: -1,
        // repeatDelay: -5
    });
}
techsAnimate();

const aboutLink = document.querySelector("#aboutLink");
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
const btnSubmit = document.querySelector("#submit");
btnSubmit.addEventListener("click", () => {
    window.addEventListener("unload", () => {
        resetForm();
    });
});

//функция очистки полей
function resetForm() {
    document.querySelector(".formStyle").reset();
}

// scroll в начало страницы
const linkHome = document.querySelector(".linkHome");
linkHome.addEventListener("click", () => {
    // event.preventDefault();
    window.scrollTo({ top: 0 }) ||
        document.documentElement.scrollTo({ top: 0 });
});
