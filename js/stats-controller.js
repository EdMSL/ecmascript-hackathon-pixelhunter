import StatsView from './stats-view.js';
import Application from './application.js';

class StatsController {
  constructor(state) {
    this.statsView = new StatsView(state);
    this.statsView.goToStartScreen = () => Application.showWelcome();
  }
}

export default StatsController;
