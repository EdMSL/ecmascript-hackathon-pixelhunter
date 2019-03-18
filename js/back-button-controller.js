import BackButtonView from './back-button-view.js';

class BackButtonController {
  constructor() {
    this.backButtonView = new BackButtonView();
    this.backButtonView.onClick = () => this.showConfirmModal();
  }

  showConfirmModal() {}
}

export default BackButtonController;
