(function(global) {
  const MAX_FLIPP_CARDS = 2;

  let flippedCount = 0;
  let flippedCardArr = [];

  const doc = global.document,
    win = global.window,
    cardImgMap = new Map([
      ['images/1.jpg', 1],
      ['images/2.jpg', 2],
      ['images/3.jpg', 3],
      ['images/4.jpg', 4],
      ['images/5.jpg', 5],
      ['images/6.jpg', 6],
    ]);

  const gameBoard = doc.querySelector('.board');

  gameBoard.addEventListener('click', event => {
    if (event.target.classList.contains('front')) {
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
        console.log('We have pair');
      }
      flippedCardArr.forEach(flippCardFrontEnd);
    }
  }

  function flippCardFrontEnd(cardNode) {
    setTimeout(() => {
      cardNode.classList.remove('hover');
    }, 1000);
  }

  function cardPairCheck() {}

  const cardNodeArr = Array.prototype.slice.call(
    doc.querySelectorAll('.flip-container'),
  );

  let id = 0;
  const cardArr = cardNodeArr.map(cardNode => {
    if (id == 0 || id == 6) {
      id = 0;
      images = shuffle(Array.from(cardImgMap.keys()));
    }

    let imgPath = images[id++];
    let card = new Card(cardNode, imgPath, cardImgMap.get(imgPath));
    return card;
  });

  function Card(node, imgPath, type) {
    this.type = type;
    this.node = node;

    let imgNode = doc.createElement('img');
    let cardBack = node.querySelector('.back');
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
