import {PointsForGameStage} from './game-data.js';
import {updateView} from './utils.js';
import getHeaderScreen from './header-controller.js';
import renderGameScreen from './game-controller.js';
import {AnswerTypes, GAME_STATE} from './game-data.js';

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

const changeTime = (state) => Object.assign({}, state, {time: state.time - 1});

const changeAnswers = (state, newAnswer) => Object.assign({}, state, {answers: addAnswer(state, newAnswer)});

const setDefaultTime = (state) => Object.assign({}, state, {time: GAME_STATE.time});

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

let timer;
let maxTime;
let timeLeft;

const startTimer = (state, element) => {
  maxTime = state.time;
  timeLeft = maxTime;
  timer = setInterval(() => {
    state = changeTime(state);
    timeLeft--;
    updateView(element, getHeaderScreen(state).element);
    if (state.time === 0) {
      renderGameScreen(setDefaultTime(setNextLevel(deleteLive(changeAnswers(state, AnswerTypes.WRONG)))));
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
  stopTimer,
  timeLeft
};
