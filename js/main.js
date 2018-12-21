(function(global) {
  const MAX_FLIPP_CARDS = 2,
    SHOW_CARDS_TIME = 1000;

  const doc = global.document,
    win = global.window;

  let flippedCount = 0,
    flippedCardArr = [],
    cardImgArr = [
      'images/1.jpg',
      'images/2.jpg',
      'images/3.jpg',
      'images/4.jpg',
      'images/5.jpg',
      'images/6.jpg',
    ];

  const gameBoard = doc.querySelector('.board');

  gameBoard.addEventListener('click', event => {
    if (!event.target.classList.contains('front-disabled')) {
      flippCardBackEnd(event.target.parentElement);
    }
  });

  gameBoard.addEventListener('transitionend', e => {
    if (!e.target.classList.contains('hover')) {
      console.log('pop');
      flippedCardArr.pop();
      if (!flippedCardArr.length) flippedCount = 0;
    }
  });

  function flippCardBackEnd(cardNode) {
    if (flippedCount < MAX_FLIPP_CARDS) {
      cardNode.classList.toggle('hover');
      flippedCount++;
      flippedCardArr.push(cardNode);
    }

    if (flippedCardArr.length == MAX_FLIPP_CARDS) {
      if (cardPairCheck()) {
        disableCardPair();
      }
      flippedCardArr.forEach(flippCardFrontEnd);
    }
  }

  function flippCardFrontEnd(cardNode) {
    setTimeout(() => {
      cardNode.classList.remove('hover');
    }, SHOW_CARDS_TIME);
  }

  function disableCardPair() {
    flippedCardArr.forEach(card => {
      card.re;
      card.children[0].classList.add('front-disabled');
      console.log(card);
    });
  }

  function cardPairCheck() {
    let res =
      flippedCardArr[0].children[1].children[0].src ==
      flippedCardArr[1].children[1].children[0].src;
    console.log(res);
    return res;
  }

  const cardNodeArr = Array.prototype.slice.call(
    doc.querySelectorAll('.flip-container'),
  );

  let id = 0;
  const cardArr = cardNodeArr.map(cardNode => {
    if (id == 0 || id == 6) {
      id = 0;
      cardImgArr = shuffle(cardImgArr);
    }
    setCardImg(cardNode, cardImgArr[id++]);
  });

  function setCardImg(cardNode, imgPath) {
    let imgNode = doc.createElement('img');
    let cardBack = cardNode.querySelector('.back');
    imgNode.src = imgPath;
    imgNode.setAttribute('width', '100%');
    imgNode.setAttribute('height', '100%');
    cardBack.appendChild(imgNode);
  }

  function shuffle(arr) {
    return arr.sort(function() {
      return 0.5 - Math.random();
    });
  }
})(this);
