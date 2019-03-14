import BackButtonView from './back-button-view.js';
import Application from './application.js';

class BackButtonController {
  constructor(cb) {
    this.cb = cb;
    this.backButtonView = new BackButtonView();
    this.backButtonView.onClick = () => {
      Application.showWelcome();
      this.cb();
    };
  }
}

export default BackButtonController;
