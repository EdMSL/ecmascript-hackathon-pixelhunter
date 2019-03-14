import GreetingView from './greeting-view.js';
import Application from './application.js';

class GreatingController {
  constructor() {
    this.greetingView = new GreetingView();
    this.greetingView.onClick = () => Application.showRules();
    this.greetingView.goToStartScreen = () => Application.showWelcome();
  }
}

export default GreatingController;
