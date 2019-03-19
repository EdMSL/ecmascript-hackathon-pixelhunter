import AbstractView from './abstract-view.js';
import BackButtonController from './back-button-controller.js';
import ConfirmController from './confirm-controller.js';
import Application from './application.js';

const DANGER_TIME = 5;

const getGameLivesTemplate = (state) => `
  <div class="game__timer">${state.time}</div>
  <div class="game__lives">
  ${new Array(state.maxLives - state.lives)
    .fill(`<img src="img/heart__empty.svg" class="game__heart" alt="Life" width="31" height="27">`)
    .join(``)}
    ${new Array(state.lives)
    .fill(`<img src="img/heart__full.svg" class="game__heart" alt="Life" width="31" height="27">`)
    .join(``)}
  </div>
`;

class HeaderView extends AbstractView {
  constructor(state) {
    super();
    this.backButton = new BackButtonController();
    this.confirmModal = new ConfirmController();

    if (state) {
      this.state = state;
      this.timerValue = this.element.querySelector(`.game__timer`);

      this.backButton.onClick = () => {
        this.showConfirmModal();
      };
      this.confirmModal.goToStartScreen = () => {
        this.goToStartScreen();
      };
    } else {
      this.backButton.onClick = () => {
        this.goToStartScreen();
      };
    }
  }

  get template() {
    let headerTemplate = (this.state) ? `
    <header class="header">
      ${getGameLivesTemplate(this.state)}
    </header>
    ` : `
    <header class="header">
    </header>
    `;

    return headerTemplate;
  }

  updateTimer(state) {
    this.state = state;
    this.timerValue.textContent = this.state.time;
    if (this.state.time === DANGER_TIME) {
      this.timerValue.classList.add(`blink`);
    }
  }

  showConfirmModal() {}

  goToStartScreen() {}

  bind() {
    this.header = this._element.querySelector(`.header`);
    this.header.insertAdjacentElement(`afterbegin`, this.backButton.backButtonView.element);
    if (this.state) {
      this.header.appendChild(this.confirmModal.confirmView.element);
    }
  }
}

export default HeaderView;
