import AbstractView from './abstract-view.js';

class ConfirmView extends AbstractView {
  constructor() {
    super();
  }

  get template() {
    return `
    <section class="modal modal--hidden">
      <form class="modal__inner">
        <button class="modal__close" type="button">
          <span class="visually-hidden">Закрыть</span>
        </button>
        <h2 class="modal__title">Подтверждение</h2>
        <p class="modal__text">Вы уверены что хотите начать игру заново?</p>
        <div class="modal__button-wrapper">
          <button class="modal__btn" type="submit">Ок</button>
          <button class="modal__btn">Отмена</button>
        </div>
      </form>
    </section>
    `;
  }

  onCloseClick() {}

  onConfirmClick() {}

  bind() {
    this.modal = this._element.querySelector(`.modal`);
    const modalForm = this._element.querySelector(`.modal__inner`);
    const closeButton = this._element.querySelector(`.modal__close`);
    const cancelButton = this._element.querySelector(`.modal__btn:last-of-type`);

    closeButton.addEventListener(`click`, (evt) => {
      evt.preventDefault();
      this.onCloseClick();
    });

    cancelButton.addEventListener(`click`, (evt) => {
      evt.preventDefault();
      this.onCloseClick();
    });

    modalForm.addEventListener(`submit`, (evt) => {
      evt.preventDefault();
      this.onSubmit();
    });
  }
}

export default ConfirmView;
