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

  const SINGLE_SCREEN_TITLE = `<p class="game__task">Угадай, фото или рисунок?</p>`;
  const DOUBLE_SCREEN_TITLE = `<p class="game__task">Угадайте для каждого изображения фото или рисунок?</p>`;

  const WIDE_WIDTH = 705;
  const WIDE_HEIGHT = 455;
  const STANDART_WIDTH = 468;
  const STANDART_HEIGHT = 458;

  let gameScreenTemplate;

  const gameStatsTemplate = `
    <ul class="stats">
      ${fillAnswersList(state)}
    </ul>
  `;

  const getDefaultGameScreenTemplate = (title, width, height, isWide) => `
    ${title}
    <form class="game__content  game__content${(() => {
    if (isWide) {
      return `--wide`;
    }
    return ``;
  }
  )()}">
      ${question.map((element, index) => `
        <div class="game__option">
          <img src="${element.img}" alt="Option ${index + 1}" width="${width}" height="${height}">
          <label class="game__answer game__answer--photo">
            <input class="visually-hidden" name="question${index + 1}" type="radio" value="photo">
            <span>Фото</span>
          </label>
          <label class="game__answer game__answer--paint">
            <input class="visually-hidden" name="question${index + 1}" type="radio" value="paint">
            <span>Рисунок</span>
          </label>
        </div>
      `).join(``)}
    </form>
    ${gameStatsTemplate}
  `;

  const getThreeImagesGameScreenTemplate = () => `
    <p class="game__task">Найдите рисунок среди изображений</p>
    <form class="game__content  game__content--triple">
      ${question.map((element, index) => `
        <div class="game__option">
          <img src="${element.img}" alt="Option ${index + 1}" width="304" height="455">
        </div>
      `).join(``)}
    </form>
    ${gameStatsTemplate}
  `;

  if (question.length === TRIPLE_GAME_SCREEN) {
    gameScreenTemplate = `
      <section class="game">
        ${getThreeImagesGameScreenTemplate()}
      </section>
    `;
  } else if (question.length === DOUBLE_GAME_SCREEN) {
    gameScreenTemplate = `
      <section class="game">
        ${getDefaultGameScreenTemplate(DOUBLE_SCREEN_TITLE, STANDART_WIDTH, STANDART_HEIGHT)}
      </section>
    `;
  } else if (question.length === SINGLE_GAME_SCREEN) {
    gameScreenTemplate = `
      <section class="game">
        ${getDefaultGameScreenTemplate(SINGLE_SCREEN_TITLE, WIDE_WIDTH, WIDE_HEIGHT, true)}
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
    gameState.level = gameState.level + 1;
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
