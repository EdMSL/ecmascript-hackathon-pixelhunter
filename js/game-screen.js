import {makeElementFromTemplate, renderScreen} from './utils.js';
import {changeGameScreen} from './controls.js';
import getStatsScreen from './stats.js';
import getHeader from './header.js';
import gameState from './game-data.js';

const fillStateList = (state) => {
  let newArr = [];

  for (let i = 0; i < state.answers.length; i++) {
    newArr.push(`<li class="stats__result stats__result--${state.answers[i]}"></li>`);
  }

  return newArr.join(``);
};

const getGameScreen = (question, state) => {
  const SINGLE_GAME_SCREEN = 1;
  const DOUBLE_GAME_SCREEN = 2;
  const TRIPLE_GAME_SCREEN = 3;

  let gameScreenTemplate;
  let gameScreenType;

  const gameStatsTemplate = `
    <ul class="stats">
      ${fillStateList(state)}
    </ul>
  `;

  const oneImageGameScreenTemplate = `
    <p class="game__task">Угадай, фото или рисунок?</p>
    <form class="game__content  game__content--wide">
      <div class="game__option">
        <img src="http://placehold.it/705x455" alt="Option 1" width="705" height="455">
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
        <img src="http://placehold.it/468x458" alt="Option 1" width="468" height="458">
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
        <img src="http://placehold.it/468x458" alt="Option 2" width="468" height="458">
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
    gameScreenType = `triple`;
    gameScreenTemplate = `
      <section class="game">
        ${threeImagesGameScreenTemplate}
      </section>
    `;
  } else if (question.length === DOUBLE_GAME_SCREEN) {
    gameScreenType = `double`;
    gameScreenTemplate = `
      <section class="game">
        ${twoImagesGameScreenTemplate}
      </section>
    `;
  } else if (question.length === SINGLE_GAME_SCREEN) {
    gameScreenType = `single`;
    gameScreenTemplate = `
      <section class="game">
        ${oneImageGameScreenTemplate}
      </section>
    `;
  } else {
    throw new Error(`Некорректная длина массива вопроса`);
  }

  const gameScreen = makeElementFromTemplate(gameScreenTemplate);

  const gameContentForm = gameScreen.querySelector(`.game__content`);

  let GameQuestions = gameContentForm.querySelectorAll(`.game__option`);

  switch (gameScreenType) {
    case `triple`:
      gameContentForm.addEventListener(`click`, (evt) => {
        const target = evt.target;

        if (target.tagName !== `IMG`) {
          return;
        }

        renderScreen([getStatsScreen()]);
      });
      break;
    case `double`:
      // const radioInputsFirstQuestion = gameScreen.querySelectorAll(`input[name="question1"]`);
      // const radioInputsSecondQuestion = gameScreen.querySelectorAll(`input[name="question2"]`);

      gameContentForm.addEventListener(`change`, () => {
        changeGameScreen([getHeader(gameState, false), getStatsScreen()], GameQuestions);
      });
      break;
    case `single`:
      // const radioInputsFirstQuestio = gameScreen.querySelectorAll(`input[name="question1"]`);

      gameContentForm.addEventListener(`change`, () => {
        changeGameScreen([getHeader(gameState, false), getStatsScreen()], GameQuestions);
      });
      break;
  }

  return gameScreen;
};

export default getGameScreen;
