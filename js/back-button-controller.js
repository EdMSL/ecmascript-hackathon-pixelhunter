import BackButtonView from './back-button-view.js';
import getIntroScreen from './intro-controller.js';
import {renderScreen} from './utils.js';

const getBackButton = () => {
  const backButton = new BackButtonView();

  backButton.onClick = () => renderScreen([getIntroScreen().element]);

  return backButton;
};

export default getBackButton;
