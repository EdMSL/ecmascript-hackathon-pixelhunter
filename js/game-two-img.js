import {makeElementFromTemplate} from './utils.js';
import {changeGameScreen} from './controls.js';
import getStats from './stats.js';
// import gameOneImgScreen from './game-one-img.js';
import START_GAME_STATE from './game-data.js';
import getHeader from './header.js';

const getGameScreen = () => {
  let gameScreen;
  const gameTwoImgScreen = makeElementFromTemplate(`
  <section class="game">
    <p class="game__task">Угадайте для каждого изображения фото или рисунок?</p>
    <form class="game__content">
      <div class="game__option">
        <img src="http://placehold.it/468x458" alt="Option 1" width="468" height="458">
        <label class="game__answer game__answer--photo">
          <input class="visually-hidden" name="question1" type="radio" value="photo">
          <span>Фото</span>
        </label>
        <label class="game__answer game__answer--paint">
          <input class="visually-hidden" name="question1" type="radio" value="paint">
          <span>Рисунок</span>
        </label>
      </div>
      <div class="game__option">
        <img src="http://placehold.it/468x458" alt="Option 2" width="468" height="458">
        <label class="game__answer  game__answer--photo">
          <input class="visually-hidden" name="question2" type="radio" value="photo">
          <span>Фото</span>
        </label>
        <label class="game__answer  game__answer--paint">
          <input class="visually-hidden" name="question2" type="radio" value="paint">
          <span>Рисунок</span>
        </label>
      </div>
    </form>
    <ul class="stats">
      <li class="stats__result stats__result--wrong"></li>
      <li class="stats__result stats__result--slow"></li>
      <li class="stats__result stats__result--fast"></li>
      <li class="stats__result stats__result--correct"></li>
      <li class="stats__result stats__result--unknown"></li>
      <li class="stats__result stats__result--unknown"></li>
      <li class="stats__result stats__result--unknown"></li>
      <li class="stats__result stats__result--unknown"></li>
      <li class="stats__result stats__result--unknown"></li>
      <li class="stats__result stats__result--unknown"></li>
    </ul>
  </section>
  `);

  const gameContentForm = gameTwoImgScreen.querySelector(`.game__content`);
  const radioInputsFirstQuestion = gameTwoImgScreen.querySelectorAll(`input[name="question1"]`);
  const radioInputsSecondQuestion = gameTwoImgScreen.querySelectorAll(`input[name="question2"]`);

  const onGameContentFormInputsChange = () => {
    changeGameScreen([getHeader(START_GAME_STATE, false), getStats()], [radioInputsFirstQuestion, radioInputsSecondQuestion]);

  };

  gameContentForm.addEventListener(`change`, onGameContentFormInputsChange);

  return gameScreen;
};

export default getGameScreen;
