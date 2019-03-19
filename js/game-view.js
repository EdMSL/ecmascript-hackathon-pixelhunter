import AbstractView from './abstract-view.js';
import HeaderController from './header-controller.js';
import getAnswersListTemplate from './answers-list.js';

const SINGLE_GAME_SCREEN = 1;
const DOUBLE_GAME_SCREEN = 2;
const TRIPLE_GAME_SCREEN = 3;

const questionsScreenModificators = {
  [`tinder-like`]: `--wide`,
  [`one-of-three`]: `--triple`,
  [`two-of-two`]: ``,
};

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
    if (this.question.answers.length === SINGLE_GAME_SCREEN || this.question.answers.length === DOUBLE_GAME_SCREEN) {
      return `
      <section class="game">
        <p class="game__task">${this.question.question}</p>
        <form class="game__content  game__content${questionsScreenModificators[this.question.type]}">
          ${this.question.answers.map((answer, index) => `
            <div class="game__option">
              <img src="${answer.image.url}" alt="Option ${index + 1}" width="${answer.image.width}" height="${answer.image.height}">
              <label class="game__answer game__answer--photo">
                <input class="visually-hidden" name="question${index + 1}" type="radio" value="photo">
                <span>Фото</span>
              </label>
              <label class="game__answer game__answer--paint">
                <input class="visually-hidden" name="question${index + 1}" type="radio" value="painting">
                <span>Рисунок</span>
              </label>
            </div>
          `).join(``)}
        </form>
        ${getAnswersListTemplate(this.state)}
      </section>
    `;
    } else if (this.question.answers.length === TRIPLE_GAME_SCREEN) {
      return `
      <section class="game">
        <p class="game__task">${this.question.question}</p>
        <form class="game__content  game__content${questionsScreenModificators[this.question.type]}">
          ${this.question.answers.map((answer, index) => `
            <div class="game__option">
              <img src="${answer.image.url}" alt="Option ${index + 1}" width="${answer.image.width}" height="${answer.image.height}">
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

  onImgLoad() {}

  bind() {
    const mainSection = this._element.querySelector(`section`);
    const gameContentForm = this._element.querySelector(`.game__content`);
    const images = this.element.querySelectorAll(`.game__option img`);

    mainSection.insertAdjacentElement(`beforebegin`, this.header.headerView.element);

    images.forEach((it, index) => {
      it.addEventListener(`load`, () => {
        this.onImgLoad(it, index);
      }, {once: true});
    });

    switch (this.question.answers.length) {
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
