const TOTAL_QUESTIONS = 10;

const PointsForGameStage = {
  CORRECT: 100,
  FAST: 150,
  SLOW: 50,
  LIVE: 50,
};

const getScore = (answersArr, lives) => {
  if (answersArr.length < TOTAL_QUESTIONS) {
    return -1;
  }

  let totalPoints = answersArr.reduce((points, answer) => {
    return points + PointsForGameStage[answer.toUpperCase()];
  }, 0);

  totalPoints += lives * PointsForGameStage.LIVE;

  return totalPoints;
};

const deleteLive = (lives) => {
  if (lives > 0) {
    lives--;
    return lives;
  } else {
    throw new Error(`Жизней больше нет`);
  }
};

const changeLevel = (gameState, level) => {
  if (level > 0) {
    const newGameState = Object.assign({}, gameState, {level});
    return newGameState;
  } else {
    throw new Error(`Значение должно быть больше 0`);
  }
};

const createTimer = (time) => {
  let timer = setInterval(() => {
    time--;
    if (time === 0) {
      clearInterval(timer);
    }
  }, 1000);
};

export {
  getScore,
  deleteLive,
  changeLevel,
  createTimer
};
