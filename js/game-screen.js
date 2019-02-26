import {makeElementFromTemplate, renderScreen} from './utils.js';
import {changeGameScreen} from './controls.js';
import getStatsScreen from './stats.js';
import getHeader from './header.js';
import gameState from './game-data.js';
import GameQuestions from './game-questions.js';

const TOTAL_QUESTIONS = 10;

const fillAnswersList = (state) => {
  let newArr = [];

  for (let i = 0; i < state.answers.length; i++) {
    newArr.push(`<li class="stats__result stats__result--${state.answers[i]}"></li>`);
  }

  return newArr.join(``);
};

const getGameScreenElement = (question, state) => {
  const SINGLE_GAME_SCREEN = 1;
  const DOUBLE_GAME_SCREEN = 2;
  const TRIPLE_GAME_SCREEN = 3;

  let gameScreenTemplate;

  const gameStatsTemplate = `
    <ul class="stats">
      ${fillAnswersList(state)}
    </ul>
  `;

  const oneImageGameScreenTemplate = `
    <p class="game__task">Угадай, фото или рисунок?</p>
    <form class="game__content  game__content--wide">
      <div class="game__option">
        <img src="${question[0].img}" alt="Option 1" width="705" height="455">
        <label class="game__answer  game__answer--photo">
          <input class="visually-hidden" name="question1" type="radio" value="photo">
          <span>Фото</span>
        </label>
        <label class="game__answer  game__answer--paint">
          <input class="visually-hidden" name="question1" type="radio" value="paint">
          <span>Рисунок</span>
        </label>
      </div>
    </form>
    ${gameStatsTemplate}
  `;

  const twoImagesGameScreenTemplate = `
    <p class="game__task">Угадайте для каждого изображения фото или рисунок?</p>
    <form class="game__content">
      <div class="game__option">
        <img src="${question[0].img}" alt="Option 1" width="468" height="458">
        <label class="game__answer game__answer--photo">
          <input class="visually-hidden" name="question1" type="radio" value="photo">
          <span>Фото</span>
        </label>
        <label class="game__answer game__answer--paint">
          <input class="visually-hidden" name="question1" type="radio" value="paint">
          <span>Рисунок</span>
        </label>
      </div>
      <div class="game__option">
        <img src="${question[1].img}" alt="Option 2" width="468" height="458">
        <label class="game__answer  game__answer--photo">
          <input class="visually-hidden" name="question2" type="radio" value="photo">
          <span>Фото</span>
        </label>
        <label class="game__answer  game__answer--paint">
          <input class="visually-hidden" name="question2" type="radio" value="paint">
          <span>Рисунок</span>
        </label>
      </div>
    </form>
    ${gameStatsTemplate}
  `;

  const threeImagesGameScreenTemplate = `
    <p class="game__task">Найдите рисунок среди изображений</p>
    <form class="game__content  game__content--triple">
      <div class="game__option">
        <img src="http://placehold.it/304x455" alt="Option 1" width="304" height="455">
      </div>
      <div class="game__option  game__option--selected">
        <img src="http://placehold.it/304x455" alt="Option 2" width="304" height="455">
      </div>
      <div class="game__option">
        <img src="http://placehold.it/304x455" alt="Option 3" width="304" height="455">
      </div>
    </form>
    ${gameStatsTemplate}
  `;

  if (question.length === TRIPLE_GAME_SCREEN) {
    gameScreenTemplate = `
      <section class="game">
        ${threeImagesGameScreenTemplate}
      </section>
    `;
  } else if (question.length === DOUBLE_GAME_SCREEN) {
    gameScreenTemplate = `
      <section class="game">
        ${twoImagesGameScreenTemplate}
      </section>
    `;
  } else if (question.length === SINGLE_GAME_SCREEN) {
    gameScreenTemplate = `
      <section class="game">
        ${oneImageGameScreenTemplate}
      </section>
    `;
  } else {
    throw new Error(`Некорректная длина массива вопроса`);
  }

  const gameScreen = makeElementFromTemplate(gameScreenTemplate);

  return gameScreen;
};

const getGameScreen = (question, state) => {
  const gameScreen = getGameScreenElement(question, state);

  const gameContentForm = gameScreen.querySelector(`.game__content`);

  if (state.lives > 0 && state.level < TOTAL_QUESTIONS - 1) {

    switch (question.length) {
      case 3:
        gameContentForm.addEventListener(`click`, (evt) => {
          const target = evt.target;

          if (target.tagName !== `IMG`) {
            return;
          }

          renderScreen([getHeader(gameState, true), getGameScreen(GameQuestions[gameState.level], gameState)]);

        });
        break;
      case 2:
      case 1:
        let QuestionInputsGroups = gameContentForm.querySelectorAll(`.game__option`);
        gameContentForm.addEventListener(`change`, () => {
          changeGameScreen([getHeader(gameState, true), getGameScreen(GameQuestions[gameState.level], gameState)], QuestionInputsGroups);
        });
        break;
    }
    // gameState.level = gameState.level + 1;
  } else {
    gameContentForm.addEventListener(`change`, () => {
      renderScreen([getStatsScreen()]);
    });
    gameContentForm.addEventListener(`click`, () => {
      renderScreen([getStatsScreen()]);
    });
  }

  return gameScreen;
};

export default getGameScreen;
