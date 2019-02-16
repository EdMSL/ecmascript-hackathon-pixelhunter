const TOTAL_QUESTIONS = 10;

const PointsForGameStage = {
  NORMAL: 100,
  FAST: 150,
  SLOW: 50,
  LIVE: 50,
};

const getTotalPoints = (answersArr, lives) => {
  if (answersArr.length < TOTAL_QUESTIONS) {
    return -1;
  }

  let totalPoints = answersArr.reduce((points, answer) => {
    return points + PointsForGameStage[answer.toUpperCase()];
  }, 0);

  totalPoints += lives * PointsForGameStage.LIVE;

  return totalPoints;
};

export {
  getTotalPoints
};
