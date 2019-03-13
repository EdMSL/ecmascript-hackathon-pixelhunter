import HeaderView from './header-view.js';

class headerController {
  constructor(state) {
    this.headerView = new HeaderView(state);
  }
}

export default headerController;
