import {makeElementFromTemplate, renderScreen} from './utils.js';
import {changeGameScreen} from './controls.js';
import getStatsScreen from './stats.js';
import getHeader from './header.js';
import gameState from './game-data.js';
import GameQuestions from './game-questions.js';
import {getDefaultGameScreenTemplate, getThripleGameScreenTemplate} from './game-screen-template.js';

const getGameScreen = (question, state) => {
  // const SINGLE_GAME_SCREEN = 1;
  // const DOUBLE_GAME_SCREEN = 2;
  // const TRIPLE_GAME_SCREEN = 3;

  let gameScreen;

  let gameScreenTemplate;

  let gameContentForm;

  const changeCurScreen = (formElement) => {
    let QuestionInputsGroups = formElement.querySelectorAll(`.game__option`);
    gameContentForm.addEventListener(`change`, () => {
      changeGameScreen([getHeader(gameState, true), getGameScreen(GameQuestions[gameState.level], gameState)], GameQuestions[gameState.level], QuestionInputsGroups);
    });
  };


  // if (state.lives > 0 && state.level < TOTAL_QUESTIONS - 1) {

  switch (question.length) {
    case 3:
      gameScreenTemplate = `
        <section class="game">
          ${getThripleGameScreenTemplate(question, state)}
        </section>
      `;
      gameScreen = makeElementFromTemplate(gameScreenTemplate);
      gameContentForm = gameScreen.querySelector(`.game__content`);
      gameContentForm.addEventListener(`click`, (evt) => {
        const target = evt.target;

        if (target.tagName !== `IMG`) {
          return;
        }

        const clickedImgIndex = target.alt[target.alt.length - 1];

        changeGameScreen([getHeader(gameState, true), getGameScreen(GameQuestions[gameState.level], gameState)], GameQuestions[gameState.level], clickedImgIndex);

      });
      break;
    case 2:
      gameScreenTemplate = `
        <section class="game">
          ${getDefaultGameScreenTemplate(question, state)}
        </section>
      `;
      gameScreen = makeElementFromTemplate(gameScreenTemplate);
      gameContentForm = gameScreen.querySelector(`.game__content`);
      changeCurScreen(gameContentForm);
      break;
    case 1:
      gameScreenTemplate = `
        <section class="game">
          ${getDefaultGameScreenTemplate(question, state)}
        </section>
      `;
      gameScreen = makeElementFromTemplate(gameScreenTemplate);
      gameContentForm = gameScreen.querySelector(`.game__content`);
      changeCurScreen(gameContentForm);
      break;
    default: {
      throw new Error(`Некорректная длина массива вопроса`);
    }
  }
  // } else {
  //   gameContentForm.addEventListener(`change`, () => {
  //     renderScreen([getStatsScreen()]);
  //   });
  //   gameContentForm.addEventListener(`click`, () => {
  //     renderScreen([getStatsScreen()]);
  //   });
  // }

  return gameScreen;
};

export default getGameScreen;
