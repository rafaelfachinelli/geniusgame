const blueElement = document.querySelector('.genius__blue');
const yellowElement = document.querySelector('.genius__yellow');
const redElement = document.querySelector('.genius__red');
const greenElement = document.querySelector('.genius__green');

const startButtonElement = document.querySelector('.button__start');

let playerColorsOrder = [];
let gameColorsOrder = [];

//0 -> Blue
//1 -> Yellow
//2 -> Red
//3 -> Green

const startGame = () => {
  resetPlayerColorsOrder();
  resetGameColorsOrder();
  newColorToOrder();
}

const checkPlayerMove = (colorNumber) => {
  addColorClicked(colorNumber);
  console.log("playerColorsOrder: ", playerColorsOrder);
  
  if (!isPlayerColorsOrderCorrect()) {
    gameOver();
  } else if (isPlayerColorsOrderFinished()) {
    nextGameRound();
  }
}

const addColorClicked = (colorNumber) => {
  playerColorsOrder.push(colorNumber);
}

const isPlayerColorsOrderFinished = () => {
  const result = playerColorsOrder.length == gameColorsOrder.length ? true : false;
  console.log("isPlayerColorsOrderFinished:", result);
  return result;
}

const gameOver = () => {
  resetGameColorsOrder();
  resetPlayerColorsOrder();
  console.log("GAME OVER! gameColorsOrder: ", gameColorsOrder);
}

const resetGameColorsOrder = () => {
  gameColorsOrder = [];
}

const resetPlayerColorsOrder = () => {
  playerColorsOrder = [];
}

const nextGameRound = () => {
  newColorToOrder();
  resetPlayerColorsOrder();
}

const isPlayerColorsOrderCorrect = () => {
  for(let i in playerColorsOrder) {
    if (playerColorsOrder[i] != gameColorsOrder[i]) {
      console.log("isPlayerColorsOrderCorrect: false")
      return false;
    }
  }
  console.log("isPlayerColorsOrderCorrect: true")
  return true;
}

const newColorToOrder = () => {
  const randomColorNumber = Math.floor(Math.random() * 4);
  gameColorsOrder.push(randomColorNumber);
  console.log("gameColorsOrder: ", gameColorsOrder);
}

startButtonElement.addEventListener('click', () => {
  startGame();
});

blueElement.addEventListener('click', () => {
  checkPlayerMove(0);
});

yellowElement.addEventListener('click', () => {
  checkPlayerMove(1);
});

redElement.addEventListener('click', () => {
  checkPlayerMove(2);
});

greenElement.addEventListener('click', () => {
  checkPlayerMove(3);
});