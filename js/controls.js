import {renderScreen} from './utils.js';
import getIntroScreen from './intro.js';
import {PointsForGameStage} from './game-data.js';

const TRIPLE_SCREEN_CORRECT_TYPE = `paint`;

const onToMainScreenButtonClick = (evt) => {
  evt.preventDefault();
  renderScreen([getIntroScreen()]);
};

const isRadioGroupChecked = (radioCollection) => [...radioCollection].some((element) => element.checked);

const isAllRadioGroupsChecked = (radioGroups) => radioGroups.every((radioGroup) => isRadioGroupChecked(radioGroup));

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

export {
  onToMainScreenButtonClick,
  isAllRadioGroupsChecked,
  checkForCorrect,
  setNextLevel,
  deleteLive,
  changeAnswers,
  getScore
};
