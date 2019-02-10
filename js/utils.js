const main = document.querySelector(`#main`);

const makeElementFromTemplate = (template) => {
  const element = document.createElement(`div`);
  element.innerHTML = template;

  return element;
};

const clearScreen = () => {
  main.innerHTML = ``;
};

const renderScreen = (elem) => {
  clearScreen();
  main.appendChild(elem);
};

export {
  makeElementFromTemplate,
  renderScreen
};
