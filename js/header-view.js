import AbstractView from './abstract-view.js';
import BackButtonController from './back-button-controller.js';

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
    this.backButton = new BackButtonController().backButtonView.element;
    if (state) {
      this.state = state;
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

  bind() {
    const header = this._element.querySelector(`.header`);
    header.insertAdjacentElement(`afterbegin`, this.backButton);
  }
}

export default HeaderView;
