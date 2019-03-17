import {renderScreen} from './utils.js';
import IntroController from './intro-controller.js';
import GreetingController from './greeting-controller.js';
import RulesController from './rules-controller.js';
import GameModel from './game-model.js';
import GameController from './game-controller.js';
import StatsController from './stats-controller.js';

class Application {
  static showWelcome() {
    const welcomeScreen = new IntroController();
    renderScreen(welcomeScreen.introView.element);
  }

  static showGreeting() {
    const greetingScreen = new GreetingController();
    renderScreen(greetingScreen.greetingView.element);
  }

  static showRules() {
    const rulesScreen = new RulesController();
    renderScreen(rulesScreen.rulesView.element);
  }

  static showGame(playerName) {
    const gameScreen = new GameController(new GameModel(playerName));
    gameScreen.startGame();
  }

  static showStats(stats) {
    const statsScreen = new StatsController(stats);
    renderScreen(statsScreen.statsView.element);
  }
}

export default Application;
