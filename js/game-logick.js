import {PointsForGameStage} from './game-data.js';
import {updateView} from './utils.js';
import getHeaderScreen from './header-controller.js';

const TRIPLE_SCREEN_CORRECT_TYPE = `paint`;
const ONE_SECOND = 1000;

const checkRadioAnswers = (gameQuestion, radioGroups) => {
  let answers = [];
  [...radioGroups].forEach((element) => {
    element.forEach((elem) => {
      if (elem.checked) {
        answers.push(elem.value);
      }
    });
  });
  return gameQuestion.every((question, index) => {
    return question.type === answers[index];
  });
};

const checkClickAnswer = (gameQuestion, answer) => gameQuestion[answer].type === TRIPLE_SCREEN_CORRECT_TYPE;

const checkForCorrect = (question, checkedItems) => {
  if (question.length === 2 || question.length === 1) {
    return checkRadioAnswers(question, checkedItems);
  } else if (question.length === 3) {
    return checkClickAnswer(question, checkedItems);
  } else {
    return -1;
  }
};

const addAnswer = (state, newAnswer) => {
  state.answers[state.level] = newAnswer;

  return state.answers;
};

const setNextLevel = (state) => Object.assign({}, state, {level: state.level + 1});

const deleteLive = (state) => Object.assign({}, state, {lives: state.lives - 1});

const changeAnswers = (state, newAnswer) => Object.assign({}, state, {answers: addAnswer(state, newAnswer)});

const getScore = (state) => {
  let totalPoints = state.answers.reduce((points, answer) => {
    return points + PointsForGameStage[answer.toUpperCase()];
  }, 0);

  totalPoints += state.lives * PointsForGameStage.LIVE;

  return totalPoints;
};

let timer;

const startTimer = (state, element) => {
  timer = setInterval(() => {
    state = Object.assign({}, state, {time: state.time - 1});
    updateView(element, getHeaderScreen(state).element);
    if (state.time === 0) {
      clearInterval(timer);
    }
  }, ONE_SECOND);
};

const stopTimer = () => {
  clearInterval(timer);
};

export {
  checkForCorrect,
  setNextLevel,
  deleteLive,
  changeAnswers,
  getScore,
  startTimer,
  stopTimer
};
