import IntroView from './intro-view.js';
import {renderScreen} from './utils.js';
import getHeader from './header.js';
import getRulesScreen from './rules.js';

const getIntroScreen = () => {
  const introScreen = new IntroView();

  introScreen.onClick = () => renderScreen([getHeader(), getRulesScreen()]);

  return introScreen;
};

export default getIntroScreen;
