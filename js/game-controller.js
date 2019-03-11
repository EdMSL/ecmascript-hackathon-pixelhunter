import GameView from './game-view.js';
import {renderScreen, isAllRadioGroupsChecked} from './utils.js';
import {checkForCorrect, setNextLevel, deleteLive, changeAnswers} from './game-logick.js';
import getStatsScreen from './stats-controller.js';
import getHeaderScreen from './header-controller.js';
import GameQuestions from './game-questions.js';
import {AnswerTypes} from './game-data.js';

const getNextGameScreen = (state, question, checkedItems) => {
  if (checkForCorrect(question, checkedItems)) {
    renderGameScreen(setNextLevel(changeAnswers(state, AnswerTypes.CORRECT)));
  } else {
    renderGameScreen(setNextLevel(deleteLive(changeAnswers(state, AnswerTypes.WRONG))));
  }
};

const getGameScreen = (state) => {
  const gameScreen = new GameView(state);

  gameScreen.onChange = () => {
    let QuestionInputsGroups = gameScreen._element.querySelectorAll(`.game__option`);
    let radioGroupsArr = [];

    QuestionInputsGroups.forEach((inputsGroup) => radioGroupsArr.push(inputsGroup.querySelectorAll(`input[type="radio"]`)));

    if (isAllRadioGroupsChecked(radioGroupsArr)) {
      getNextGameScreen(gameScreen.state, gameScreen.question, radioGroupsArr);
    } else {
      return;
    }
  };

  gameScreen.onClick = (evt) => {
    const target = evt.target;

    if (target.tagName !== `IMG`) {
      return;
    }

    const images = gameScreen._element.querySelectorAll(`img`);
    const clickedImgIndex = [...images].indexOf(target);

    getNextGameScreen(gameScreen.state, gameScreen.question, clickedImgIndex);
  };

  return gameScreen;
};

const renderGameScreen = (state) => {
  if (state.lives > 0 && state.level <= GameQuestions.length - 1) {
    renderScreen([getHeaderScreen(state).element, getGameScreen(state).element]);
  } else {
    renderScreen([getStatsScreen(state).element]);
  }
};

export default renderGameScreen;
