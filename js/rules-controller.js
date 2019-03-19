import RulesView from './rules-view.js';
import Application from './application.js';

class RulesController {
  constructor() {
    this.rulesView = new RulesView();
    this.rulesView.onSubmit = (playerName) => Application.showGame(playerName);
    this.rulesView.goToStartScreen = () => Application.showGreeting();
  }
}

export default RulesController;
