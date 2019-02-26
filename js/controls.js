import {renderScreen} from './utils.js';
import getIntroScreen from './intro.js';

const onToMainScreenButtonClick = (evt) => {
  evt.preventDefault();
  renderScreen([getIntroScreen()]);
};

const isRadioGroupChecked = (radioCollection) => [...radioCollection].some((element) => element.checked);

const isAllRadioGroupsChecked = (questions) => {
  let radioGroupsArr = [];

  questions.forEach((question) => radioGroupsArr.push(question.querySelectorAll(`input[type="radio"]`)));

  return radioGroupsArr.every((radioGroup) => isRadioGroupChecked(radioGroup));
};

const changeGameScreen = (screens, array) => {
  if (isAllRadioGroupsChecked(array)) {
    renderScreen(screens);
  }
};

export {
  onToMainScreenButtonClick,
  changeGameScreen,
};
