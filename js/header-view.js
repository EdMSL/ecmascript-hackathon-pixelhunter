import AbstractView from './abstract-view.js';

const backButtonTemplate = `
  <button class="back">
    <span class="visually-hidden">Вернуться к началу</span>
    <svg class="icon" width="45" height="45" viewBox="0 0 45 45" fill="#000000">
      <use xlink:href="img/sprite.svg#arrow-left"></use>
    </svg>
    <svg class="icon" width="101" height="44" viewBox="0 0 101 44" fill="#000000">
      <use xlink:href="img/sprite.svg#logo-small"></use>
    </svg>
  </button>
`;

const getGameLivesTemplate = (state) => `
  <div class="game__timer">NN</div>
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
    if (state) {
      this.state = state;
    }
  }

  get template() {
    let headerTemplate = (this.state) ? `
    <header class="header">
      ${backButtonTemplate}
      ${getGameLivesTemplate(this.state)}
    </header>
    ` : `
    <header class="header">
      ${backButtonTemplate}
    </header>
    `;

    return headerTemplate;
  }

  onClick() {}

  bind() {
    const backButton = this._element.querySelector(`.back`);

    backButton.addEventListener(`click`, (evt) => {
      evt.preventDefault();
      this.onClick(evt);
    });
  }
}

export default HeaderView;
