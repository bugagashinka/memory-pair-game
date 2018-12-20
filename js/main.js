(function(global) {
  let MAX_HANDLED_CARD = 2;

  let doc = global.document,
    win = global.window;

  let cardImgMap = new Map([
    ['images/1.jpg', 1],
    ['images/2.jpg', 2],
    ['images/3.jpg', 3],
    ['images/4.jpg', 4],
    ['images/5.jpg', 5],
    ['images/6.jpg', 6],
  ]);
  let imageArr = Array.from(cardImgMap.keys());

  let cardNodeArr = Array.prototype.slice.call(
    document.querySelectorAll('.flip-container'),
  );

  let id = 0;
  let cardArr = cardNodeArr.map(cardNode => {
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
