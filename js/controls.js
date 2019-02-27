import {renderScreen} from './utils.js';
import getIntroScreen from './intro.js';
import gameState from './game-data.js';
import getStatsScreen from './stats.js';

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
  if (gameQuestion.every((question, index) => {
    return question.type === answers[index];
  })) {
    gameState.level += 1;
  } else {
    gameState.lives -= 1;
    gameState.level += 1;
  }
};

const checkClickAnswer = (gameQuestion, answer) => {
  if (gameQuestion[answer - 1].type === `paint`) {
    gameState.level += 1;
  } else {
    gameState.lives -= 1;
    gameState.level += 1;
  }
};

const changeGameScreen = (screens, gameQuestion, questionInputs) => {
  if (gameState.lives > 0 && gameState.level < 9) {
    if (gameQuestion.length === 2 || gameQuestion.length === 1) {
      let radioGroupsArr = [];

      questionInputs.forEach((question) => radioGroupsArr.push(question.querySelectorAll(`input[type="radio"]`)));

      if (isAllRadioGroupsChecked(radioGroupsArr)) {
        checkRadioAnswers(gameQuestion, radioGroupsArr);
        if (gameState.lives > 0 && gameState.level < 9) {
          renderScreen(screens);
        } else {
          renderScreen([getStatsScreen()]);
        }
      }
    } else {
      checkClickAnswer(gameQuestion, questionInputs);
      if (gameState.lives > 0 && gameState.level < 9) {
        renderScreen(screens);
      } else {
        renderScreen([getStatsScreen()]);
      }
    }
  } else {
    renderScreen([getStatsScreen()]);
  }
  console.log(gameState.level)
  console.log(gameState.lives)
};

export {
  onToMainScreenButtonClick,
  changeGameScreen,
};
