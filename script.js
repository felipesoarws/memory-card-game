const cards = document.querySelectorAll(".card");
const endGameWarn = document.querySelector(".end-game-warning");
const newGameBttn = document.getElementById("new-game-button");

let cardOne, cardTwo;
let disableDeck = false;
let matched = 0;

// girar a carta clicada
const flipCard = ({ target: clickedCard }) => {
  if (cardOne !== clickedCard && !disableDeck) {
    addClass(clickedCard, "flip");

    if (!cardOne) {
      return (cardOne = clickedCard);
    }

    cardTwo = clickedCard;
    disableDeck = true;

    let cardOneImg = cardOne.querySelector(".back-view img").src,
      cardTwoImg = cardTwo.querySelector(".back-view img").src;

    matchCards(cardOneImg, cardTwoImg);
  }
};

// checar se as cartas clicadas são iguais
const matchCards = (i1, i2) => {
  if (i1 == i2) {
    matched++;

    if (matched == 8) {
      setTimeout(() => {
        return addClass(endGameWarn, "show");
      }, 500);
    }

    cardOne.removeEventListener("click", flipCard);
    cardTwo.removeEventListener("click", flipCard);
    cardOne = cardTwo = "";
    return (disableDeck = false);
  }

  setTimeout(() => {
    addClass(cardOne, "shake");
    addClass(cardTwo, "shake");
  }, 500);

  setTimeout(() => {
    removeClass(cardOne, "flip");
    removeClass(cardTwo, "flip");
    cardOne = cardTwo = "";
    disableDeck = false;
  }, 1000);
};

// zerar o jogo depois de completo e embaralhar novo jogo
const shuffleCard = () => {
  matched = 0;
  cardOne = cardTwo = "";
  disableDeck = false;

  let arr = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];

  arr.sort(() => (Math.random() > 0.5 ? 1 : -1));

  cards.forEach((card, i) => {
    removeClass(card, "flip");
    let imgTag = card.querySelector(".back-view img");
    imgTag.src = `images/img-${arr[i]}.png`;
    card.addEventListener("click", flipCard);
  });
};

// adicionar  e remover classes de um jeito mais limpo
const addClass = (item, classToAdd) => {
  item.classList.add(classToAdd);
};

const removeClass = (item, classToRemove) => {
  item.classList.remove(classToRemove);
};

// inicio do jogo
newGameBttn.addEventListener("click", () => {
  removeClass(endGameWarn, "show");
  setTimeout(() => {
    return shuffleCard();
  }, 500);
});

cards.forEach((card) => {
  card.addEventListener("click", flipCard);
});
