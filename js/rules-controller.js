import RulesView from './rules-view.js';
import renderGameScreen from './game-controller.js';
import {GAME_STATE} from './game-data.js';

class RulesController {
  constructor() {
    this.rulesView = new RulesView();
    this.rulesView.onSubmit = () => renderGameScreen(GAME_STATE);
  }
}

export default RulesController;
