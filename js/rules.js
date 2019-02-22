import {makeElementFromTemplate, renderScreen} from './utils.js';
import getHeader from './header.js';
import START_GAME_STATE from './game-data.js';
import getGameScreen from './game-screen.js';
import gameQuestions from './game-questions.js';

const renderRulesScreen = () => {
  const NAME_MIN_LENGTH = 3;

  const rulesScreen = makeElementFromTemplate(`
    <section class="rules">
    <h2 class="rules__title">Правила</h2>
    <ul class="rules__description">
      <li>Угадай 10 раз для каждого изображения фото
        <img class="rules__icon" src="img/icon-photo.png" width="32" height="31" alt="Фото"> или рисунок
        <img class="rules__icon" src="img/icon-paint.png" width="32" height="31" alt="Рисунок"></li>
      <li>Фотографиями или рисунками могут быть оба изображения.</li>
      <li>На каждую попытку отводится 30 секунд.</li>
      <li>Ошибиться можно не более 3 раз.</li>
    </ul>
    <p class="rules__ready">Готовы?</p>
    <form class="rules__form">
      <input class="rules__input" type="text" placeholder="Ваше Имя">
      <button class="rules__button  continue" type="submit" disabled>Go!</button>
    </form>
    </section>
  `);

  const rulesForm = rulesScreen.querySelector(`.rules__form`);
  const rulesInput = rulesScreen.querySelector(`.rules__input`);
  const rulesButton = rulesScreen.querySelector(`.rules__button`);

  const onRulesInputChange = () => {
    if (rulesInput.value.length >= NAME_MIN_LENGTH) {
      rulesButton.disabled = ``;
    } else {
      rulesButton.disabled = `true`;
    }
  };

  const onRulesFormSubmit = (evt) => {
    evt.preventDefault();
    renderScreen([getHeader(START_GAME_STATE, true), getGameScreen(gameQuestions[0], START_GAME_STATE)]);
  };

  rulesInput.addEventListener(`input`, onRulesInputChange);
  rulesForm.addEventListener(`submit`, onRulesFormSubmit);

  return rulesScreen;
};

export default renderRulesScreen;
