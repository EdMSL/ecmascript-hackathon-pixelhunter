import {makeElementFromTemplate} from './utils.js';
import {onToMainScreenButtonClick} from './controls.js';

const statsTemplate = `
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

const getGameTemplate = (state) => `
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

const getHeader = (state) => {
  let headerTemplate;

  if (state) {
    headerTemplate = `
    <header class="header">
      ${statsTemplate}
      ${getGameTemplate(state)}
    </header>
    `;
  } else {
    headerTemplate = `
    <header class="header">
      ${statsTemplate}
    </header>
    `;
  }

  const headerElement = makeElementFromTemplate(headerTemplate);

  const backButton = headerElement.querySelector(`.back`);
  backButton.addEventListener(`click`, onToMainScreenButtonClick);

  return headerElement;
};

export default getHeader;
