import {makeElementFromTemplate, renderScreen} from './utils.js';
import {changeGameScreen} from './controls.js';
import getStatsScreen from './stats.js';
import getHeader from './header.js';
import gameState from './game-data.js';
import GameQuestions from './game-questions.js';
import getGameScreenTemplate from './game-screen-template.js';

const SINGLE_GAME_SCREEN = 1;
const DOUBLE_GAME_SCREEN = 2;
const TRIPLE_GAME_SCREEN = 3;

const getGameScreen = (question, state) => {
  // if (state.lives > 0 && state.level < TOTAL_QUESTIONS - 1) {
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

        changeGameScreen([getHeader(gameState, true), getGameScreen(GameQuestions[gameState.level], gameState)], GameQuestions[gameState.level], clickedImgIndex);

      });
      break;

    case DOUBLE_GAME_SCREEN:
    case SINGLE_GAME_SCREEN:
      let QuestionInputsGroups = gameContentForm.querySelectorAll(`.game__option`);

      gameContentForm.addEventListener(`change`, () => {
        changeGameScreen([getHeader(gameState, true), getGameScreen(GameQuestions[gameState.level], gameState)], GameQuestions[gameState.level], QuestionInputsGroups);
      });
      break;

    default: {
      throw new Error(`Некорректная длина массива вопроса`);
    }
  }
  // } else {
  //   renderScreen([getStatsScreen()]);
  // }

  return gameScreen;
};

export default getGameScreen;
