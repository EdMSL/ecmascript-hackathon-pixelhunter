const SINGLE_GAME_SCREEN = 1;
const DOUBLE_GAME_SCREEN = 2;
const TRIPLE_GAME_SCREEN = 3;

const SINGLE_SCREEN_TITLE = `Угадай, фото или рисунок?`;
const DOUBLE_SCREEN_TITLE = `Угадайте для каждого изображения фото или рисунок?`;
const TRIPLE_SCREEN_TITLE = `Найдите рисунок среди изображений`;

const SINGLE_SCREEN_MODIFICATOR = `--wide`;
const TRIPLE_SCREEN_MODIFICATOR = `--triple`;
const NO_MODIFICATOR = ``;

const WIDE_WIDTH = 705;
const WIDE_HEIGHT = 455;
const NARROW_WIDTH = 304;
const NARROW_HEIGHT = 455;
const STANDART_WIDTH = 468;
const STANDART_HEIGHT = 458;

const fillAnswersList = (state) => state.answers.map((element) => `<li class="stats__result stats__result--${element}"></li>`).join(``);

const gameStatsTemplate = (state) => `
  <ul class="stats">
    ${fillAnswersList(state)}
  </ul>
`;

const setTemplateParameterValue = (question, parameterValue1, parameterValue2) => {
  if (question.length === 1) {
    return parameterValue1;
  }
  return parameterValue2;
};

const getGameScreenTemplate = (question, state) => {
  if (question.length === SINGLE_GAME_SCREEN || question.length === DOUBLE_GAME_SCREEN) {
    return `
    <section class="game">
      <p class="game__task">${setTemplateParameterValue(question, SINGLE_SCREEN_TITLE, DOUBLE_SCREEN_TITLE)}</p>
      <form class="game__content  game__content${setTemplateParameterValue(question, SINGLE_SCREEN_MODIFICATOR, NO_MODIFICATOR)}">
        ${question.map((questionImg, index) => `
          <div class="game__option">
            <img src="${questionImg.img}" alt="Option ${index + 1}" width="${setTemplateParameterValue(question, WIDE_WIDTH, STANDART_WIDTH)}" height="${setTemplateParameterValue(question, WIDE_HEIGHT, STANDART_HEIGHT)}">
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
      ${gameStatsTemplate(state)}
    </section>
  `;
  } else if (question.length === TRIPLE_GAME_SCREEN) {
    return `
    <section class="game">
      <p class="game__task">${TRIPLE_SCREEN_TITLE}</p>
      <form class="game__content  game__content${TRIPLE_SCREEN_MODIFICATOR}">
        ${question.map((questionImg, index) => `
          <div class="game__option">
            <img src="${questionImg.img}" alt="Option ${index + 1}" width="${NARROW_WIDTH}" height="${NARROW_HEIGHT}">
          </div>
        `).join(``)}
      </form>
      ${gameStatsTemplate(state)}
    </section>
  `;
  } else {
    throw new Error(`Некорректная длина массива вопроса`);
  }
};

export default getGameScreenTemplate;
