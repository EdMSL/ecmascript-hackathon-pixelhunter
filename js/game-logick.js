import {PointsForGameStage} from './game-data.js';
import {AnswerTypes, GAME_STATE} from './game-data.js';

const SINGLE_GAME_SCREEN = 1;
const DOUBLE_GAME_SCREEN = 2;
const TRIPLE_GAME_SCREEN = 3;

const setNextLevel = (state) => Object.assign({}, state, {level: state.level + 1});

const deleteLive = (state) => Object.assign({}, state, {lives: state.lives - 1});

const addAnswer = (state, newAnswer) => {
  state.answers[state.level - 1] = newAnswer;

  return state.answers;
};

const changeAnswers = (state, newAnswer) => Object.assign({}, state, {answers: addAnswer(state, newAnswer)});

const checkRadioAnswers = (gameQuestion, radioGroups) => {
  let answers = [];
  [...radioGroups].forEach((element) => {
    element.forEach((elem) => {
      if (elem.checked) {
        answers.push(elem.value);
      }
    });
  });
  return gameQuestion.answers.every((question, index) => {
    return question.type === answers[index];
  });
};

const getCorrectAnswerType = (question) => {
  let paintings = 0;
  let photos = 0;

  question.answers.forEach((answer) => {
    if (answer.type === `painting`) {
      paintings++;
    } else {
      photos++;
    }
  });

  return paintings > photos ? `photo` : `painting`;
};

const checkClickAnswer = (gameQuestion, answer) => gameQuestion.answers[answer].type === getCorrectAnswerType(gameQuestion);

const checkForCorrect = (question, checkedItems) => {
  if (question.answers.length === SINGLE_GAME_SCREEN || question.answers.length === DOUBLE_GAME_SCREEN) {
    return checkRadioAnswers(question, checkedItems);
  } else if (question.answers.length === TRIPLE_GAME_SCREEN) {
    return checkClickAnswer(question, checkedItems);
  } else {
    return -1;
  }
};

const getScore = (state) => {
  let totalPoints = state.answers.reduce((points, answer) => {
    let currentPoints;

    if (answer === AnswerTypes.FAST || answer === AnswerTypes.SLOW) {
      currentPoints = PointsForGameStage[answer.toUpperCase()] + PointsForGameStage[AnswerTypes.CORRECT.toUpperCase()];
    } else {
      currentPoints = PointsForGameStage[answer.toUpperCase()];
    }
    return points + currentPoints;
  }, 0);

  totalPoints += state.lives * PointsForGameStage.LIVE;

  return totalPoints;
};

const setDefaultTime = (state) => Object.assign({}, state, {time: GAME_STATE.time});

const changeTime = (state) => Object.assign({}, state, {time: state.time - 1});

export {
  checkForCorrect,
  setNextLevel,
  deleteLive,
  changeAnswers,
  getScore,
  setDefaultTime,
  changeTime
};
