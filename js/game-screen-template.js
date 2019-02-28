const SINGLE_SCREEN_TITLE = `<p class="game__task">Угадай, фото или рисунок?</p>`;
const DOUBLE_SCREEN_TITLE = `<p class="game__task">Угадайте для каждого изображения фото или рисунок?</p>`;

const SINGLE_SCREEN_MODIFICATOR = `--wide`;
const NO_MODIFICATOR = ``;

const WIDE_WIDTH = 705;
const WIDE_HEIGHT = 455;
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

const getDefaultGameScreenTemplate = (question, state) => `
    ${setTemplateParameterValue(question, SINGLE_SCREEN_TITLE, DOUBLE_SCREEN_TITLE)}
    <form class="game__content  game__content${setTemplateParameterValue(question, SINGLE_SCREEN_MODIFICATOR, NO_MODIFICATOR)}">
      ${question.map((element, index) => `
        <div class="game__option">
          <img src="${element.img}" alt="Option ${index + 1}" width="${setTemplateParameterValue(question, WIDE_WIDTH, STANDART_WIDTH)}" height="${setTemplateParameterValue(question, WIDE_HEIGHT, STANDART_HEIGHT)}">
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
  `;

const getThripleGameScreenTemplate = (question, state) => `
  <p class="game__task">Найдите рисунок среди изображений</p>
  <form class="game__content  game__content--triple">
    ${question.map((element, index) => `
      <div class="game__option">
        <img src="${element.img}" alt="Option ${index + 1}" width="304" height="455">
      </div>
    `).join(``)}
  </form>
  ${gameStatsTemplate(state)}
`;

export {
  getDefaultGameScreenTemplate,
  getThripleGameScreenTemplate
};
