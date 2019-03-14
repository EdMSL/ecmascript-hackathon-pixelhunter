import AbstractView from './abstract-view.js';
import HeaderController from './header-controller.js';
import getAnswersListTemplate from './answers-list.js';

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

const setTemplateParameterValue = (question, parameterValue1, parameterValue2) => question.length === 1 ? parameterValue1 : parameterValue2;

class GameView extends AbstractView {
  constructor(state, question) {
    super();
    this.state = state;
    this.question = question;
    this.header = new HeaderController(this.state);
    this.header.goToStartScreen = () => {
      this.goToStartScreen();
    };
  }

  get template() {
    if (this.question.length === SINGLE_GAME_SCREEN || this.question.length === DOUBLE_GAME_SCREEN) {
      return `
      <section class="game">
        <p class="game__task">${setTemplateParameterValue(this.question, SINGLE_SCREEN_TITLE, DOUBLE_SCREEN_TITLE)}</p>
        <form class="game__content  game__content${setTemplateParameterValue(this.question, SINGLE_SCREEN_MODIFICATOR, NO_MODIFICATOR)}">
          ${this.question.map((questionImg, index) => `
            <div class="game__option">
              <img src="${questionImg.img}" alt="Option ${index + 1}" width="${setTemplateParameterValue(this.question, WIDE_WIDTH, STANDART_WIDTH)}" height="${setTemplateParameterValue(this.question, WIDE_HEIGHT, STANDART_HEIGHT)}">
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
        ${getAnswersListTemplate(this.state)}
      </section>
    `;
    } else if (this.question.length === TRIPLE_GAME_SCREEN) {
      return `
      <section class="game">
        <p class="game__task">${TRIPLE_SCREEN_TITLE}</p>
        <form class="game__content  game__content${TRIPLE_SCREEN_MODIFICATOR}">
          ${this.question.map((questionImg, index) => `
            <div class="game__option">
              <img src="${questionImg.img}" alt="Option ${index + 1}" width="${NARROW_WIDTH}" height="${NARROW_HEIGHT}">
            </div>
          `).join(``)}
        </form>
        ${getAnswersListTemplate(this.state)}
      </section>
    `;
    } else {
      throw new Error(`Некорректная длина массива вопроса`);
    }
  }

  updateHeader(state) {
    this.state = state;
    this.header.headerView.updateTimer(this.state);
  }

  onChange() {}

  onClick() {}

  goToStartScreen() {}

  bind() {
    const mainSection = this._element.querySelector(`section`);
    const gameContentForm = this._element.querySelector(`.game__content`);

    mainSection.insertAdjacentElement(`beforebegin`, this.header.headerView.element);

    switch (this.question.length) {
      case TRIPLE_GAME_SCREEN:
        gameContentForm.addEventListener(`click`, (evt) => {
          this.onClick(evt);
        });
        break;

      case DOUBLE_GAME_SCREEN:
      case SINGLE_GAME_SCREEN:
        gameContentForm.addEventListener(`change`, () => {
          this.onChange();
        });
        break;

      default: {
        throw new Error(`Некорректная длина массива вопроса`);
      }
    }
  }
}

export default GameView;
