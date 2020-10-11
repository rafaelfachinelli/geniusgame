(function(){ //Closure Protect
  const blueElement = document.querySelector('.genius--blue');
  const yellowElement = document.querySelector('.genius--yellow');
  const redElement = document.querySelector('.genius--red');
  const greenElement = document.querySelector('.genius--green');
  
  const scorePointsLastElement = document.querySelector('.points__last');
  const scorePointsActualElement = document.querySelector('.points__actual');
  const scorePointsBestElement = document.querySelector('.points__best');

  const statusStartElement = document.querySelector('.status--start');
  const statusWaitElement = document.querySelector('.status--wait');
  const statusPlayerElement = document.querySelector('.status--player');
  
  const startButtonElement = document.querySelector('.button__start');

  const soundButtonElement = document.querySelector('.button__sound');
  
  let playerColorsOrder = [];
  let gameColorsOrder = [];
  
  let scorePointsLast = 0;
  let scorePointsActual = 0;
  let scorePointsBest = 0;

  let playerTime = false;
  
  //0 -> Blue
  //1 -> Yellow
  //2 -> Red
  //3 -> Green
  
  //Game Logic
  
  const startGame = () => {
    statusState('start', true);
    resetScorePointActual();
    resetPlayerColorsOrder();
    resetGameColorsOrder();
    newColorToOrder();
    setTimeout(()=> {
      showGameColorsOrder();
    }, 700)
  }
  
  const checkPlayerMove = (colorNumber) => {
    addColorClicked(colorNumber);
    
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
    return result;
  }
  
  const gameOver = () => {
    saveScorePointsLastBest();
    resetScorePointActual();
    resetGameColorsOrder();
    resetPlayerColorsOrder();
    statusState('start', false);
    statusState('wait', false);
    statusState('player', false);
  }

  const saveScorePointsLastBest = () => {
    if (scorePointsActual > 0) {
      scorePointsLastElement.innerText = scorePointsActual;
    }
    
    if (scorePointsActual > scorePointsBest) {
      scorePointsBest = scorePointsActual;
      scorePointsBestElement.innerText = scorePointsBest;
    }
  }
  
  const resetGameColorsOrder = () => {
    gameColorsOrder = [];
  }
  
  const resetPlayerColorsOrder = () => {
    playerColorsOrder = [];
  }
  
  const nextGameRound = () => {
    resetPlayerColorsOrder();
    addPoint();
    newColorToOrder();
    statusState('wait', true);
    statusState('player', false);
    setTimeout(() => {
      showGameColorsOrder();
    }, 2000);
  }
  
  const addPoint = () => {
    scorePointsActual++;
    scorePointsActualElement.innerText = scorePointsActual;
  }
  
  const resetScorePointActual = () => {
    scorePointsActual = 0;
    scorePointsActualElement.innerText = "---";
  }
  
  const isPlayerColorsOrderCorrect = () => {
    for(let i in playerColorsOrder) {
      if (playerColorsOrder[i] != gameColorsOrder[i]) {
        return false;
      }
    }
    return true;
  }
  
  const newColorToOrder = () => {
    const randomColorNumber = Math.floor(Math.random() * 4);
    gameColorsOrder.push(randomColorNumber);
  }
  
  const showGameColorsOrder = () => {
    setPlayerTime(false);
  
    for (let i in gameColorsOrder) {
      setTimeout(() => {
        addClassEffectGameBlock(gameColorsOrder[i]);
        playSoundBeep(gameColorsOrder[i]);
  
        if (i == gameColorsOrder.length-1) {
          setTimeout(() => {
            setPlayerTime(true);
            statusState('wait', false);
            statusState('player', true);
          }, 300);
        }
      }, 1700 * (i/3));
    }
  
  }
  
  const setPlayerTime = (choose) => {
    playerTime = choose;
  }
  
  const isPlayerTime = () => {
    return playerTime;
  }

  const showPlayerScoreInScreen = () => {

  }

  const isSoundsActive = () => {
    return soundButtonElement.checked ? false : true;
  }
  
  //Player Controls
  
  startButtonElement.addEventListener('click', () => {
    startGame();
    playSoundClick();
  });
  
  blueElement.addEventListener('click', () => {
    isPlayerTime() ? checkPlayerMove(0) : gameOver();
    playSoundBeep(0);
  });
  
  yellowElement.addEventListener('click', () => {
    isPlayerTime() ? checkPlayerMove(1) : gameOver();
    playSoundBeep(1);
  });
  
  redElement.addEventListener('click', () => {
    isPlayerTime() ? checkPlayerMove(2) : gameOver();
    playSoundBeep(2);
  });
  
  greenElement.addEventListener('click', () => {
    isPlayerTime() ? checkPlayerMove(3) : gameOver();
    playSoundBeep(3);
  });
  
  //Visual Effects
  
  const addClassEffectGameBlock = (colorNumber) => {
  
    let colorElement;
  
    switch(colorNumber){
      case 0:
        colorElement = blueElement;
        break;
      case 1:
        colorElement = yellowElement;
        break;
      case 2:
        colorElement = redElement;
        break;
      case 3:
        colorElement = greenElement;
        break;
    }
  
    colorElement.classList.add('genius__show');
  
    setTimeout(() => {
      colorElement.classList.remove('genius__show');
    }, 300);
  }

  const playSoundBeep = (colorNumber) => {
    if (isSoundsActive()) {
      resetSounds();
  
      switch(colorNumber) {
        case 0:
          beep0.play();
          break;
        case 1:
          beep1.play();
          break;
        case 2:
          beep2.play();
          break;
        case 3:
          beep3.play();
          break;
      }
    }
  }

  const resetSounds = () => {
    beep0.pause();
    beep0.currentTime = 0;
    beep1.pause();
    beep1.currentTime = 0;
    beep2.pause();
    beep2.currentTime = 0;
    beep3.pause();
    beep3.currentTime = 0;
  }

  const playSoundClick = () => {
    if (isSoundsActive()) {
      click.play();
    }
  }
  
  const statusState = (stringStatus , state) => {
    if (state) {
      switch(stringStatus) {
        case 'start':
          statusStartElement.classList.add('status__light--start');
          break;
        case 'wait':
          statusWaitElement.classList.add('status__light--wait');
          break;
        case 'player':
          statusPlayerElement.classList.add('status__light--player');
          break;
      }
    } else {
      switch(stringStatus) {
        case 'start':
          statusStartElement.classList.remove('status__light--start');
          break;
        case 'wait':
          statusWaitElement.classList.remove('status__light--wait');
          break;
        case 'player':
          statusPlayerElement.classList.remove('status__light--player');
          break;
      }
    }
  }
})();