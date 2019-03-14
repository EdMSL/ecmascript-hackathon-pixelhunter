import HeaderView from './header-view.js';

class HeaderController {
  constructor(state) {
    this.headerView = new HeaderView(state);
    this.headerView.goToStartScreen = () => {
      this.goToStartScreen();
    };
  }

  goToStartScreen() {}
}

export default HeaderController;
