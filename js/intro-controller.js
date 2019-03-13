import IntroView from './intro-view.js';
import Application from './application.js';

class IntroController {
  constructor() {
    this.introView = new IntroView();
    this.introView.onClick = () => Application.showGreeting();
  }
}

export default IntroController;
