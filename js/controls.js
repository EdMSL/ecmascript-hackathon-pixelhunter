import {renderScreen} from './utils.js';
import introScreen from './intro.js';

const onToMainScreenButtonClick = (evt) => {
  evt.preventDefault();
  renderScreen(introScreen);
};

const isRadioChecked = (radioCollection) => [...radioCollection].some((element) => element.checked);

const isAllRadioGroupsChecked = (radioGroupsArr) => radioGroupsArr.every((radioGroup) => isRadioChecked(radioGroup));

const changeGameScreen = (screen, array) => {
  if (isAllRadioGroupsChecked(array)) {
    renderScreen(screen);
  }
};

export {
  onToMainScreenButtonClick,
  changeGameScreen,
};
