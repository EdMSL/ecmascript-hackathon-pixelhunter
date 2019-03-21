const body = document.querySelector(`main`);

const makeElementFromTemplate = (template) => {
  const element = document.createElement(`div`);
  element.innerHTML = template;

  return element;
};

const renderScreen = (element, isCrossfade) => {
  const mainSection = document.querySelector(`#main`);
  const mainId = mainSection.id;
  const mainClass = mainSection.classList.value;

  if (isCrossfade) {
    const downScreen = mainSection.querySelector(`section:first-of-type`);
    const upScreen = element.querySelector(`section`);
    downScreen.classList.add(`central--blur-start`);

    upScreen.insertAdjacentElement(`beforebegin`, downScreen);
  }

  mainSection.id = ``;
  element.id = mainId;
  element.className = mainClass;

  body.replaceChild(element, mainSection);
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
  updateView,
};
