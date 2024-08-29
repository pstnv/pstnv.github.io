export function displayCardBackSide(card, i, cards) {
    card.addEventListener("click", (e) => {
        const moreInfo = e.target.classList.contains("moreInfo");
        if (moreInfo) {
            // отобразить все карточки лицевой стороной
            displayAllCardsFront(cards);
            // отобразить выбранную карту тыльной стороной
            card.classList.remove("displayFrontCard");
            // ставим таймер: даст задержку исполнения на плавный фон
            setTimeout(() => {
                const cardBack = card.querySelector(".cardBack");
                cardBack.classList.add("background-fade");
            }, 0);
        }
    });
}

function displayAllCardsFront(cards) {
    cards.forEach((card) => {
        // закрыть карту
        card.classList.add("displayFrontCard");
        const cardBack = card.querySelector(".cardBack");
        cardBack.classList.remove("background-fade");
    });
}

export function handleDisplayAllCardsFront(e) {
    const card = e.target.closest(".card");
    if (!card) {
        const cards = document.querySelectorAll(".card");
        displayAllCardsFront(cards);
    }
}
