import BackButtonView from './back-button-view.js';
import {onToMainScreenButtonClick} from './controls.js';

const getBackButton = () => {
  const backButton = new BackButtonView();

  backButton.onClick = (evt) => onToMainScreenButtonClick(evt);

  return backButton;
};

export default getBackButton;
