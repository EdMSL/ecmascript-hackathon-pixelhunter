import {renderScreen, checkResponseStatus} from './utils.js';
import ErrorController from './error-controller.js';
import IntroController from './intro-controller.js';
import GreetingController from './greeting-controller.js';
import RulesController from './rules-controller.js';
import GameModel from './game-model.js';
import GameController from './game-controller.js';
import StatsController from './stats-controller.js';

let gameData;

class Application {
  static start() {
    window.fetch(`https://es.dump.academy/pixel-hunter/questions`).
      then(checkResponseStatus).
      then((response) => response.json()).
      then((data) => {
        gameData = data;
      }).
      then(()=> Application.showGreeting()).
      catch(Application.showError);
  }

  static showWelcome() {
    const welcomeScreen = new IntroController();
    renderScreen(welcomeScreen.introView.element);
    if (gameData) {
      Application.showGreeting();
    } else {
      Application.start();
    }
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
    const gameScreen = new GameController(new GameModel(gameData, playerName));
    gameScreen.startGame();
  }

  static showStats(stats) {
    const statsScreen = new StatsController(stats);
    renderScreen(statsScreen.statsView.element);
  }

  static showError(error) {
    const errorModal = new ErrorController(error);
    renderScreen(errorModal.errorView.element);
  }
}

export default Application;
