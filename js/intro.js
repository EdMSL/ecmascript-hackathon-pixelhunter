import {makeElementFromTemplate, renderScreen} from './utils.js';
import greetingScreen from './greeting.js';

const introScreen = makeElementFromTemplate(`
  <section id="intro" class="intro">
  <button class="intro__asterisk asterisk" type="button"><span class="visually-hidden">Продолжить</span>*</button>
  <p class="intro__motto"><sup>*</sup> Это не фото. Это рисунок маслом нидерландского художника-фотореалиста Tjalf Sparnaay.</p>
  <button class="intro__top top" type="button">
    <img src="img/icon-top.svg" width="71" height="79" alt="Топ игроков">
  </button>
  </section>
`);

const introButton = introScreen.querySelector(`.intro__asterisk`);

const onIntroButtonClick = (evt) => {
  evt.preventDefault();
  renderScreen(greetingScreen);
};

introButton.addEventListener(`click`, onIntroButtonClick);

export default introScreen;
