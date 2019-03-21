import {renderScreen, renderGreetingScreen} from './utils.js';
import Loader from './loader.js';
import ErrorController from './error-controller.js';
import IntroController from './intro-controller.js';
import GreetingController from './greeting-controller.js';
import RulesController from './rules-controller.js';
import GameModel from './game-model.js';
import GameController from './game-controller.js';
import StatsController from './stats-controller.js';

const CROSSFADE_TIME = 1500;

let gameData;
let isFirstLoad = true;

class Application {
  static start() {
    Application.load().catch(Application.showError);
  }

  static async load() {
    try {
      gameData = await Loader.loadGameData();
      Application.showGreeting();
    } finally {
      console.log(`Complete`);
    }
  }

  static showWelcome() {
    if (!gameData) {
      const welcomeScreen = new IntroController();
      renderScreen(welcomeScreen.introView.element);
      Application.start();
    } else {
      Application.showGreeting();
    }
  }

  static showGreeting() {
    const greetingScreen = new GreetingController();
    if (isFirstLoad) {
      renderGreetingScreen(greetingScreen.greetingView.element);
      setTimeout(()=> {
        greetingScreen.greetingView.onDataLoad(isFirstLoad);
      }, CROSSFADE_TIME);
      isFirstLoad = false;
    } else {
      renderScreen(greetingScreen.greetingView.element);
      greetingScreen.greetingView.onDataLoad();
    }
  }

  static showRules() {
    const rulesScreen = new RulesController();
    renderScreen(rulesScreen.rulesView.element);
  }

  static showGame(playerName) {
    const gameScreen = new GameController(new GameModel(gameData, playerName));
    gameScreen.startGame();
  }

  static async showStats(stats) {
    const playerName = stats.playerName;
    try {
      await Loader.saveStats(stats.state, playerName);
      const response = await Loader.loadStats(playerName);
      const statsScreen = new StatsController(response[response.length - 1]);
      renderScreen(statsScreen.statsView.element);
    } catch (error) {
      Application.showError(error);
    }
  }

  static showError(error) {
    const errorModal = new ErrorController(error);
    renderScreen(errorModal.errorView.element);
  }
}

export default Application;
