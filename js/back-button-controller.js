import BackButtonView from './back-button-view.js';
import {stopTimer} from './game-logick.js';
import Application from './application.js';

class BackButtonController {
  constructor() {
    this.backButtonView = new BackButtonView();
    this.backButtonView.onClick = () => {
      Application.showWelcome();
      stopTimer();
    };
  }
}

export default BackButtonController;
