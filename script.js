let order = [];
let clickedOrder = [];
let score = 0;

//0 - Verde
//1 - Vermelho
//2 - Amarelo
//3 - Azul

const geniusGreen = document.querySelector('.genius__green');
const geniusRed = document.querySelector('.genius__red');
const geniusYellow = document.querySelector('.genius__yellow');
const geniusBlue = document.querySelector('.genius__blue');

//Criar ordem aleatória de cores
const shuffleOrder = () => {
  const colorOrder = Math.floor(Math.random() * 4);
  order[order.length] = colorOrder;
  clickedOrder = [];

  for(let i in order) {
    lightColor(createColorElement(order[i]), Number(i) + 1);
  }
}


//Acender a próxima cor
const lightColor = (element, number) => {
  number = number * 500;

  setTimeout(() => {
    element.classList.add('genius__selected');
  }, number - 250);

  setTimeout(() => {
    element.classList.remove('genius__selected');
  }, 700);

}

//Checar os botões clicados
const checkOrder = () => {
  for(let i in clickedOrder) {
    if(clickedOrder[i] != order[i]) {
      gameOver();
      break;
    }
  }

  if(clickedOrder.length == order.length) {
    alert(`Pontuação: ${score} Iniciando próxima rodada...`);
    nextLevel();
  }
}

//Clique do jogador
const playerClick = (color) => {
  clickedOrder[clickedOrder.length] = color;
  createColorElement(color).classList.add('genius__selected');

  setTimeout(() => {
    createColorElement(color).classList.remove('genius__selected');
    checkOrder();
  }, 100);

}

//Retorno de cor
const createColorElement = (color) => {
  if (color == 0) return geniusGreen;
  if (color == 1) return geniusRed;
  if (color == 2) return geniusYellow;
  if (color == 3) return geniusBlue;
}

//Níveis de jogo
const nextLevel = () => {
  score++;
  shuffleOrder();
}

//Game Over
const gameOver = () => {
  alert(`Pontuação: ${score} GAME OVER`);
  order = [];
  clickedOrder = [];

  playGame();
}

//Iniciar jogo
const playGame = () => {
  alert('Bem vindo ao GENIUS, iniciando novo jogo...');
  score = 0;

  nextLevel();
}

geniusGreen.onclick = () => playerClick(0);
geniusRed.onclick = () => playerClick(1);
geniusYellow.onclick = () => playerClick(2);
geniusBlue.onclick = () => playerClick(3);

playGame();