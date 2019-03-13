import HeaderView from './header-view.js';

class HeaderController {
  constructor(state) {
    this.headerView = new HeaderView(state);
  }
}

export default HeaderController;
