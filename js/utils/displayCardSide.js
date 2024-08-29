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

export function displayAllCardsFront(cards) {
    cards.forEach((card) => {
        // закрыть карту
        card.classList.add("displayFrontCard");
        const cardBack = card.querySelector(".cardBack");
        cardBack.classList.remove("background-fade");
    });
}
