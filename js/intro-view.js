import AbstractView from './abstract-view.js';

class IntroView extends AbstractView {
  constructor() {
    super();
  }

  get template() {
    return `
      <section id="intro" class="intro">
        <button class="intro__asterisk asterisk" type="button"><span class="visually-hidden">Продолжить</span>*</button>
        <p class="intro__motto"><sup>*</sup> Это не фото. Это рисунок маслом нидерландского художника-фотореалиста Tjalf Sparnaay.</p>
      </section>
    `;
  }

  onClick() {}

  bind() {
    const introButton = this._element.querySelector(`.intro__asterisk`);

    // introButton.addEventListener(`click`, (evt) => {
    //   evt.preventDefault();
    //   this.onClick();
    // });
  }
}

export default IntroView;
