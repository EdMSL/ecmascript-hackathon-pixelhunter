const GAME_STATE = Object.freeze({
  level: 0,
  lives: 3,
  maxLives: 3,
  time: 30,
  answers: [`unknown`, `unknown`, `unknown`, `unknown`, `unknown`, `unknown`, `unknown`, `unknown`, `unknown`, `unknown`]
});

const PointsForGameStage = {
  CORRECT: 100,
  FAST: 50,
  SLOW: -50,
  UNKNOWN: 0,
  WRONG: 0,
  LIVE: 50,
};

const AnswerTypes = {
  CORRECT: `correct`,
  FAST: `fast`,
  SLOW: `slow`,
  WRONG: `wrong`,
};

export {
  GAME_STATE,
  PointsForGameStage,
  AnswerTypes
};
