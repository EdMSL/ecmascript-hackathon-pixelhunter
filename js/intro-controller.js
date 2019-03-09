import IntroView from './intro-view.js';
import {renderScreen} from './utils.js';
import getHeaderScreen from './header-controller.js';
import getRulesScreen from './rules.js';

const getIntroScreen = (state) => {
  const introScreen = new IntroView(state);

  introScreen.onClick = () => renderScreen([getHeaderScreen(state).element, getRulesScreen()]);

  return introScreen;
};

export default getIntroScreen;
