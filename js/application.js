import {renderScreen} from './utils.js';
import HeaderController from './header-controller.js';
import IntroController from './intro-controller.js';
import GreetingController from './greeting-controller.js';
import RulesController from './rules-controller.js';

class Application {
  static showWelcome() {
    const welcomeScreen = new IntroController();
    renderScreen([welcomeScreen.introView.element]);
  }

  static showGreeting() {
    const greetingScreen = new GreetingController();
    renderScreen([greetingScreen.greetingView.element]);
  }

  static showRules() {
    const rulesScreen = new RulesController();
    const headerScreen = new HeaderController();
    renderScreen([headerScreen.headerView.element, rulesScreen.rulesView.element]);
  }
}

export default Application;
