import RulesView from './rules-view.js';
import {renderScreen} from './utils.js';
import getHeaderScreen from './header-controller.js';
import getGreetingScreen from './greeting-controller.js';

const getRulesScreen = (state) => {
  const rulesScreen = new RulesView();

  rulesScreen.onSubmit = () => renderScreen([getHeaderScreen(state).element, getGreetingScreen().element]);

  return rulesScreen;
};

export default getRulesScreen;
