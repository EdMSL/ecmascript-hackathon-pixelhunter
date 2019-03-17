const mainSection = document.querySelector(`#main`);

const makeElementFromTemplate = (template) => {
  const element = document.createElement(`div`);
  element.innerHTML = template;

  return element;
};

const clearScreen = () => {
  mainSection.innerHTML = ``;
};

const renderScreen = (element) => {
  clearScreen();
  mainSection.appendChild(element);
};

const updateView = (container, view) => {
  container.innerHTML = ``;
  container.appendChild(view);
};

const isRadioGroupChecked = (radioCollection) => [...radioCollection].some((element) => element.checked);

const isAllRadioGroupsChecked = (radioGroups) => radioGroups.every((radioGroup) => isRadioGroupChecked(radioGroup));

const checkResponseStatus = (response) => {
  if (response.ok) {
    return response;
  } else {
    throw new Error(`${response.status}`);
  }
};

export {
  makeElementFromTemplate,
  renderScreen,
  isAllRadioGroupsChecked,
  updateView,
  checkResponseStatus,
};
