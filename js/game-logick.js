import {PointsForGameStage} from './game-data.js';
import {AnswerTypes, GAME_STATE} from './game-data.js';

const TRIPLE_SCREEN_CORRECT_TYPE = `painting`;

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

const checkClickAnswer = (gameQuestion, answer) => gameQuestion.answers[answer].type === TRIPLE_SCREEN_CORRECT_TYPE;

const checkForCorrect = (question, checkedItems) => {
  if (question.answers.length === 2 || question.answers.length === 1) {
    return checkRadioAnswers(question, checkedItems);
  } else if (question.answers.length === 3) {
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
