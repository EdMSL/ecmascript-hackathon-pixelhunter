import {renderScreen} from './utils.js';
import introScreen from './intro.js';

const toMainScreenButtonClick = (evt) => {
  evt.preventDefault();
  renderScreen(introScreen);
};

export {
  toMainScreenButtonClick,
};
