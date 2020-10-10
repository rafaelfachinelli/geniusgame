(function(){ //Closure Protect
  const blueElement = document.querySelector('.genius--blue');
  const yellowElement = document.querySelector('.genius--yellow');
  const redElement = document.querySelector('.genius--red');
  const greenElement = document.querySelector('.genius--green');
  
  const scorePointsElement = document.querySelector('.score__points');
  
  const statusStartElement = document.querySelector('.status--start');
  const statusWaitElement = document.querySelector('.status--wait');
  const statusPlayerElement = document.querySelector('.status--player');
  
  const startButtonElement = document.querySelector('.button__start');
  
  let playerColorsOrder = [];
  let gameColorsOrder = [];
  
  let scorePoints = 0;
  let playerTime = false;
  
  //0 -> Blue
  //1 -> Yellow
  //2 -> Red
  //3 -> Green
  
  //Game Logic
  
  const startGame = () => {
    resetPoints();
    resetPlayerColorsOrder();
    resetGameColorsOrder();
    newColorToOrder();
    showGameColorsOrder();
    statusState('start', true);
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
    resetPoints();
    resetGameColorsOrder();
    resetPlayerColorsOrder();
    statusState('start', false);
    statusState('wait', false);
    statusState('player', false);
  }
  
  const resetGameColorsOrder = () => {
    gameColorsOrder = [];
  }
  
  const resetPlayerColorsOrder = () => {
    playerColorsOrder = [];
  }
  
  const nextGameRound = () => {
    resetPlayerColorsOrder();
    newColorToOrder();
    showGameColorsOrder();
    addPoint();
  }
  
  const addPoint = () => {
    scorePoints++;
    scorePointsElement.innerText = scorePoints;
  }
  
  const resetPoints = () => {
    scorePoints = 0;
    scorePointsElement.innerText = "---";
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
    statusState('wait', true);
    statusState('player', false);
  
    for (let i in gameColorsOrder) {
      setTimeout(() => {
        addClassEffectGameBlock(gameColorsOrder[i]);
  
        if (i == gameColorsOrder.length-1) {
          setTimeout(() => {
            setPlayerTime(true);
            statusState('wait', false);
            statusState('player', true);
          }, 500);
        }
      }, 1500 * i);
    }
  
  }
  
  const setPlayerTime = (choose) => {
    playerTime = choose;
  }
  
  const isPlayerTime = () => {
    return playerTime;
  }
  
  //Player Controls
  
  startButtonElement.addEventListener('click', () => {
    startGame();
    soundBeep();
  });
  
  blueElement.addEventListener('click', () => {
    isPlayerTime() ? checkPlayerMove(0) : gameOver();
    soundBeep();
  });
  
  yellowElement.addEventListener('click', () => {
    isPlayerTime() ? checkPlayerMove(1) : gameOver();
    soundBeep();
  });
  
  redElement.addEventListener('click', () => {
    isPlayerTime() ? checkPlayerMove(2) : gameOver();
    soundBeep();
  });
  
  greenElement.addEventListener('click', () => {
    isPlayerTime() ? checkPlayerMove(3) : gameOver();
    soundBeep();
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
  
    setTimeout(() => {
      colorElement.classList.add('genius__show');
    }, 300);
  
    setTimeout(() => {
      colorElement.classList.remove('genius__show');
    }, 700);
  }
  
  const soundBeep = () => {
    const snd = new Audio("data:audio/wav;base64,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qJrx4KOQjahZxWbcZgztj2c49nKmkId44S71j0c8eV9yDK6uPRzx5X18eDvjvQ6yKo9ZSS6l//8elePK/Lf//IInrOF/FvDoADYAGBMGb7FtErm5MXMlmPAJQVgWta7Zx2go+8xJ0UiCb8LHHdftWyLJE0QIAIsI+UbXu67dZMjmgDGCGl1H+vpF4NSDckSIkk7Vd+sxEhBQMRU8j/12UIRhzSaUdQ+rQU5kGeFxm+hb1oh6pWWmv3uvmReDl0UnvtapVaIzo1jZbf/pD6ElLqSX+rUmOQNpJFa/r+sa4e/pBlAABoAAAAA3CUgShLdGIxsY7AUABPRrgCABdDuQ5GC7DqPQCgbbJUAoRSUj+NIEig0YfyWUho1VBBBA//uQZB4ABZx5zfMakeAAAAmwAAAAF5F3P0w9GtAAACfAAAAAwLhMDmAYWMgVEG1U0FIGCBgXBXAtfMH10000EEEEEECUBYln03TTTdNBDZopopYvrTTdNa325mImNg3TTPV9q3pmY0xoO6bv3r00y+IDGid/9aaaZTGMuj9mpu9Mpio1dXrr5HERTZSmqU36A3CumzN/9Robv/Xx4v9ijkSRSNLQhAWumap82WRSBUqXStV/YcS+XVLnSS+WLDroqArFkMEsAS+eWmrUzrO0oEmE40RlMZ5+ODIkAyKAGUwZ3mVKmcamcJnMW26MRPgUw6j+LkhyHGVGYjSUUKNpuJUQoOIAyDvEyG8S5yfK6dhZc0Tx1KI/gviKL6qvvFs1+bWtaz58uUNnryq6kt5RzOCkPWlVqVX2a/EEBUdU1KrXLf40GoiiFXK///qpoiDXrOgqDR38JB0bw7SoL+ZB9o1RCkQjQ2CBYZKd/+VJxZRRZlqSkKiws0WFxUyCwsKiMy7hUVFhIaCrNQsKkTIsLivwKKigsj8XYlwt/WKi2N4d//uQRCSAAjURNIHpMZBGYiaQPSYyAAABLAAAAAAAACWAAAAApUF/Mg+0aohSIRobBAsMlO//Kk4soosy1JSFRYWaLC4qZBYWFRGZdwqKiwkNBVmoWFSJkWFxX4FFRQWR+LsS4W/rFRb/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////VEFHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAU291bmRib3kuZGUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMjAwNGh0dHA6Ly93d3cuc291bmRib3kuZGUAAAAAAAAAACU=");  
    snd.play();
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