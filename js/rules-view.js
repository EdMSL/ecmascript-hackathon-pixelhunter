import AbstractView from './abstract-view.js';
import HeaderController from './header-controller.js';

const NAME_MIN_LENGTH = 3;

class RulesView extends AbstractView {
  constructor() {
    super();
    this.header = new HeaderController().headerView.element;
  }

  get template() {
    return `
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
    `;
  }

  onSubmit() {}

  bind() {
    const mainSection = this._element.querySelector(`section`);
    const rulesForm = this._element.querySelector(`.rules__form`);
    const rulesInput = this._element.querySelector(`.rules__input`);
    const rulesButton = this._element.querySelector(`.rules__button`);

    mainSection.insertAdjacentElement(`beforebegin`, this.header);

    rulesForm.addEventListener(`submit`, (evt) => {
      evt.preventDefault();
      this.onSubmit();
    });

    rulesInput.addEventListener(`input`, () => {
      if (rulesInput.value.length >= NAME_MIN_LENGTH) {
        rulesButton.disabled = ``;
      } else {
        rulesButton.disabled = true;
      }
    });
  }
}

export default RulesView;
