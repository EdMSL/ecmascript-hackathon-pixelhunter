import {renderScreen} from './utils.js';
import Intro from './intro-controller.js';

class Application {
  static showWelcome() {
    const welcome = new Intro();
    renderScreen([welcome.introScreen.element]);
  }
}

export default Application;
