const main = document.querySelector(`#main`);

const makeElementFromTemplate = (template) => {
  const element = document.createElement(`div`);
  element.innerHTML = template;

  return element;
};

const clearScreen = () => {
  main.innerHTML = ``;
};

const renderScreen = (elements) => {
  clearScreen();
  elements.forEach((template) => {
    main.appendChild(template);
  });
};

const updateView = (container, view) => {
  container.innerHTML = ``;
  container.appendChild(view);
};

const isRadioGroupChecked = (radioCollection) => [...radioCollection].some((element) => element.checked);

const isAllRadioGroupsChecked = (radioGroups) => radioGroups.every((radioGroup) => isRadioGroupChecked(radioGroup));

export {
  makeElementFromTemplate,
  renderScreen,
  isAllRadioGroupsChecked,
  updateView
};
