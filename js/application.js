import {renderScreen} from './utils.js';
import IntroController from './intro-controller.js';
import GreetingController from './greeting-controller.js';
import RulesController from './rules-controller.js';
import GameModel from './game-model.js';
import GameController from './game-controller.js';
import StatsController from './stats-controller.js';

let gameData;

const checkStatus = (response) => {
  if (response.status >= 200 || response.status < 300) {
    return response;
  } else {
    throw new Error(`${response.status}:${response.text}`);
  }
};

class Application {
  static start() {
    window.fetch(`https://es.dump.academy/pixel-hunter/questions`).
      then(checkStatus).
      then((response) => response.json()).
      then((data) => {
        gameData = data;
      }).
      then(()=> Application.showGreeting()).
      catch();
  }

  static showWelcome() {
    Application.start();
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
