import GameView from './game-view.js';
import {renderScreen, isAllRadioGroupsChecked} from './utils.js';
import {checkForCorrect, setNextLevel, deleteLive, changeAnswers, startTimer, stopTimer, timeLeft, changeTime} from './game-logick.js';
import getStatsScreen from './stats-controller.js';
import getHeaderScreen from './header-controller.js';
import GameQuestions from './game-questions.js';
import {AnswerTypes} from './game-data.js';

let game;

const getNextGameScreen = (state, question, checkedItems) => {
  game = changeTime(state, timeLeft);
  if (checkForCorrect(question, checkedItems)) {
    if (game.time > 20) {
      renderGameScreen(setNextLevel(changeAnswers(state, AnswerTypes.FAST)));
    } else if (game.time < 10) {
      renderGameScreen(setNextLevel(changeAnswers(state, AnswerTypes.SLOW)));
    } else {
      renderGameScreen(setNextLevel(changeAnswers(state, AnswerTypes.CORRECT)));
    }
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
  game = Object.assign({}, state);

  if (game.lives > 0 && game.level <= GameQuestions.length - 1) {
    // stopTimer();

    // const header = getHeaderScreen(game).element;

    renderScreen([getGameScreen(game).element]);
    // startTimer(game, header);
  } else {
    // stopTimer();
    renderScreen([getStatsScreen(game).element]);
  }
};

export default renderGameScreen;
