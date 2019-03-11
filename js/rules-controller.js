import RulesView from './rules-view.js';
import renderGameScreen from './game-controller.js';
import {GAME_STATE} from './game-data.js';

const getRulesScreen = () => {
  const rulesScreen = new RulesView();

  rulesScreen.onSubmit = () => renderGameScreen(GAME_STATE);

  return rulesScreen;
};

export default getRulesScreen;
