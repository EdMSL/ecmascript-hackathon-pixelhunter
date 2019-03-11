import IntroView from './intro-view.js';
import {renderScreen} from './utils.js';
import getHeaderScreen from './header-controller.js';
import getGreetingScreen from './greeting-controller.js';

const getIntroScreen = (state) => {
  const introScreen = new IntroView();

  introScreen.onClick = () => renderScreen([getHeaderScreen(state).element, getGreetingScreen().element]);

  return introScreen;
};

export default getIntroScreen;
