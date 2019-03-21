const body = document.querySelector(`main`);

const makeElementFromTemplate = (template) => {
  const element = document.createElement(`div`);
  element.innerHTML = template;

  return element;
};

const renderScreen = (element) => {
  const mainSection = document.querySelector(`#main`);
  const mainId = mainSection.id;
  const mainClass = mainSection.classList.value;

  mainSection.id = ``;
  element.id = mainId;
  element.className = mainClass;

  body.replaceChild(element, mainSection);
};

const renderGreetingScreen = (element) => {
  const mainSection = document.querySelector(`#main`);
  const mainId = mainSection.id;
  const mainClass = mainSection.classList.value;
  const intro = mainSection.children[0];
  intro.classList.add(`central--blur-start`);
  const greetingSection = element.querySelector(`section`);

  greetingSection.insertAdjacentElement(`beforebegin`, intro);

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
  renderGreetingScreen,
  renderScreen,
  isAllRadioGroupsChecked,
  updateView,
};
