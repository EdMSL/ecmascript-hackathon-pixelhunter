import HeaderView from './header-view.js';

class HeaderController {
  constructor(state, cb) {
    this.headerView = new HeaderView(state, cb);
  }
}

export default HeaderController;
