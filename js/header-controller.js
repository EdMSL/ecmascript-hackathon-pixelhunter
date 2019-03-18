import HeaderView from './header-view.js';

class HeaderController {
  constructor(state) {
    this.headerView = new HeaderView(state);
    this.headerView.goToStartScreen = () => {
      this.goToStartScreen();
    };
    this.headerView.showConfirmModal = () => {
      this.headerView.confirmModal.confirmView.modal.classList.remove(`modal--hidden`);
    };
  }

  goToStartScreen() {}
}

export default HeaderController;
