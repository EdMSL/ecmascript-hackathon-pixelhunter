import {makeElementFromTemplate} from './utils.js';

class AbstractView {
  constructor() {
    if (new.target === AbstractView) {
      throw new Error(`Используйте класс-наследник`);
    }
  }

  get template() {
    throw new Error(`Нужен шаблон`);
  }

  get element() {
    if (this._element) {
      return this._element;
    }

    this._element = this.render();
    this.bind();

    return this._element;
  }

  render() {
    return makeElementFromTemplate(this.template);
  }

  bind() {}
}

export default AbstractView;
