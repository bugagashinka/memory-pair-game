/* global document */
(function memoryPair() {
  const WAIT_TIME_BEFORE_RESET = 2000;
  const SHOW_CARDS_TIME = 1000;
  const MAX_FLIPP_CARDS = 2;

  const cardNodeArr = Array.from(document.querySelectorAll(".flip-container"));
  const gameBoard = document.querySelector(".board");
  const flippedCardArr = [];
  const cardImgArr = [
    "images/1.jpg",
    "images/2.jpg",
    "images/3.jpg",
    "images/4.jpg",
    "images/5.jpg",
    "images/6.jpg"
  ];

  let pairCount = 0;

  function shuffle(arr) {
    return arr.sort(() => 0.5 - Math.random());
  }

  function flippCardFrontEnd(cardNode) {
    setTimeout(() => {
      cardNode.classList.remove("hover");
    }, SHOW_CARDS_TIME);
  }

  function resetGame() {
    pairCount = 0;
    cardNodeArr.forEach(cardNode => {
      const cardFront = cardNode.querySelector(".front");
      cardFront.classList.remove("front-disabled");
    });
  }

  function disableCardPair() {
    flippedCardArr.forEach(card => {
      const frontCardStyles = card.querySelector(".front").classList;
      frontCardStyles.add("front-disabled");
    });
    if (pairCount === cardImgArr.length) {
      setTimeout(resetGame, WAIT_TIME_BEFORE_RESET);
    }
  }

  function cardPairCheck() {
    return (
      flippedCardArr[0].querySelector(".back img").src ===
      flippedCardArr[1].querySelector(".back img").src
    );
  }

  function setCardImg(cardNode, imgPath) {
    const imgNode = document.createElement("img");
    const cardBack = cardNode.querySelector(".back");
    imgNode.src = imgPath;
    imgNode.setAttribute("width", "100%");
    imgNode.setAttribute("height", "100%");
    cardBack.appendChild(imgNode);
  }

  const fullImgArray = shuffle(cardImgArr.concat(cardImgArr));
  cardNodeArr.map((cardNode, id) => {
    const nextImgId = id + 1;
    setCardImg(cardNode, fullImgArray[nextImgId]);
  });

  function flippCardBackEnd(cardNode) {
    if (
      !cardNode.classList.contains("hover") &&
      flippedCardArr.length < MAX_FLIPP_CARDS
    ) {
      cardNode.classList.toggle("hover");
      flippedCardArr.push(cardNode);
    }

    if (flippedCardArr.length === MAX_FLIPP_CARDS) {
      if (cardPairCheck()) {
        pairCount += 1;
        disableCardPair();
      }
      flippedCardArr.forEach(flippCardFrontEnd);
    }
  }

  gameBoard.addEventListener("click", ({ target }) => {
    const targetStyles = target.classList;
    if (
      !(flippedCardArr.length > 1) &&
      !targetStyles.contains("front-disabled") &&
      targetStyles.contains("front")
    ) {
      flippCardBackEnd(target.closest(".flipper"));
    }
  });

  gameBoard.addEventListener("transitionend", ({ target }) => {
    if (!target.classList.contains("hover")) {
      flippedCardArr.pop();
    }
  });
})();
