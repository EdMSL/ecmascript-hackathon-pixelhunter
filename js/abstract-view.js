import {makeElementFromTemplate} from './utils.js';
// const defaultContainer = {
//   tagName: `div`,
//   classList: `div-name`,
//   id: document.querySelector(`#main`).id,
// };


// const makeElementFromTemplate = (template, tagName = `div`, className = ``, idName = ``) => {
//   const element = document.createElement(tagName);
//   element.classList.add(className);
//   element.id = (idName) ? idName : ``;
//   element.innerHTML = template;

//   return element;
// };

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
