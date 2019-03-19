import BackButtonView from './back-button-view.js';

class BackButtonController {
  constructor() {
    this.backButtonView = new BackButtonView();
    this.backButtonView.onClick = () => this.onClick();
  }

  onClick() {}
}

export default BackButtonController;
