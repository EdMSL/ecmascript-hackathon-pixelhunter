import {renderScreen} from './utils.js';
import getIntroScreen from './intro.js';

const onToMainScreenButtonClick = (evt) => {
  evt.preventDefault();
  renderScreen([getIntroScreen()]);
};

const isRadioGroupChecked = (radioCollection) => [...radioCollection].some((element) => element.checked);

const isAllRadioGroupsChecked = (radioGroupsArr) => radioGroupsArr.every((radioGroup) => isRadioGroupChecked(radioGroup));

const changeGameScreen = (screens, array) => {
  if (isAllRadioGroupsChecked(array)) {
    renderScreen(screens);
  }
};

export {
  onToMainScreenButtonClick,
  changeGameScreen,
};
