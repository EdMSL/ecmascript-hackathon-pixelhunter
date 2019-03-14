import RulesView from './rules-view.js';
import Application from './application.js';

class RulesController {
  constructor() {
    this.rulesView = new RulesView();
    this.rulesView.onSubmit = () => Application.showGame();
    this.rulesView.goToStartScreen = () => Application.showWelcome();
  }
}

export default RulesController;
