import {makeElementFromTemplate, renderScreen} from './utils.js';
import {isAllRadioGroupsChecked, checkForCorrect, setNextLevel, deleteLive, changeAnswers} from './controls.js';
import getStatsScreen from './stats-controller.js';
import getHeaderScreen from './header-controller.js';
import GameQuestions from './game-questions.js';
import getGameScreenTemplate from './game-screen-template.js';
import {AnswerTypes} from './game-data.js';

const SINGLE_GAME_SCREEN = 1;
const DOUBLE_GAME_SCREEN = 2;
const TRIPLE_GAME_SCREEN = 3;

const getNextGameScreen = (state, question, checkedItems) => {
  if (checkForCorrect(question, checkedItems)) {
    renderGameScreen(setNextLevel(changeAnswers(state, AnswerTypes.CORRECT)));
  } else {
    renderGameScreen(setNextLevel(deleteLive(changeAnswers(state, AnswerTypes.WRONG))));
  }
};

const getGameScreen = (state) => {
  const question = GameQuestions[state.level];
  const gameScreen = makeElementFromTemplate(getGameScreenTemplate(question, state));
  const gameContentForm = gameScreen.querySelector(`.game__content`);

  switch (question.length) {
    case TRIPLE_GAME_SCREEN:
      gameContentForm.addEventListener(`click`, (evt) => {
        const target = evt.target;

        if (target.tagName !== `IMG`) {
          return;
        }

        const images = gameContentForm.querySelectorAll(`img`);
        const clickedImgIndex = [...images].indexOf(target);

        getNextGameScreen(state, question, clickedImgIndex);
      });
      break;

    case DOUBLE_GAME_SCREEN:
    case SINGLE_GAME_SCREEN:
      let QuestionInputsGroups = gameContentForm.querySelectorAll(`.game__option`);
      let radioGroupsArr = [];

      QuestionInputsGroups.forEach((inputsGroup) => radioGroupsArr.push(inputsGroup.querySelectorAll(`input[type="radio"]`)));

      gameContentForm.addEventListener(`change`, () => {
        if (isAllRadioGroupsChecked(radioGroupsArr)) {
          getNextGameScreen(state, question, radioGroupsArr);
        } else {
          return;
        }
      });
      break;

    default: {
      throw new Error(`Некорректная длина массива вопроса`);
    }
  }

  return gameScreen;
};

const renderGameScreen = (state) => {
  if (state.lives > 0 && state.level <= GameQuestions.length - 1) {
    renderScreen([getHeaderScreen(state).element, getGameScreen(state)]);
  } else {
    renderScreen([getStatsScreen(state).element]);
  }
};

export default renderGameScreen;
