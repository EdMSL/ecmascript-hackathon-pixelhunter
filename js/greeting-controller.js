import GreetingView from './greeting-view.js';
import {renderScreen} from './utils.js';
import getHeaderScreen from './header-controller.js';
import getRulesScreen from './rules-controller.js';

const getGreetingScreen = (state) => {
  const greetingScreen = new GreetingView();

  greetingScreen.onClick = () => renderScreen([getHeaderScreen(state).element, getRulesScreen().element]);

  return greetingScreen;
};

export default getGreetingScreen;
