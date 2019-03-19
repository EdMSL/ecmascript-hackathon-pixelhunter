import ConfirmView from './confirm-view.js';

class ConfirmController {
  constructor() {
    this.confirmView = new ConfirmView();
    this.confirmView.onCloseClick = () => this.confirmView.modal.classList.add(`modal--hidden`);
    this.confirmView.onSubmit = () => {
      this.goToStartScreen();
    };
  }

  goToStartScreen() {}
}

export default ConfirmController;
