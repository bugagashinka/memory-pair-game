(function(global) {
  const MAX_HANDLED_CARD = 2;

  const doc = global.document,
    win = global.window,
    cardImgMap = new Map([
      ['images/1.jpg', 1],
      ['images/2.jpg', 2],
      ['images/3.jpg', 3],
      ['images/4.jpg', 4],
      ['images/5.jpg', 5],
      ['images/6.jpg', 6],
    ]),
    imageArr = Array.from(cardImgMap.keys());

  const gameBoard = doc.querySelector('.board');

  gameBoard.addEventListener('click', event => {
    if (event.target.classList.contains('front')) {
      let flippedCard = event.target.parentElement;

      flippedCard.classList.toggle('hover');
      setTimeout(() => {
        flippedCard.classList.remove('hover');
      }, 1100);
    }
  });

  const cardNodeArr = Array.prototype.slice.call(
    doc.querySelectorAll('.flip-container'),
  );

  let id = 0;
  const cardArr = cardNodeArr.map(cardNode => {
    if (id == 0 || id == 6) {
      id = 0;
      images = shuffle(imageArr);
    }
    let card = new Card(cardNode, images[id++]);
    return card;
  });

  function Card(node, imgPath, type) {
    this.type = type;
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
