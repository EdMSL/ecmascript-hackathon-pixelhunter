import GreetingView from './greeting-view.js';
import Application from './application.js';

class GreatingController {
  constructor() {
    this.greetingView = new GreetingView();
    this.greetingView.onClick = () => Application.showRules();
    this.greetingView.goToStartScreen = () => Application.showWelcome();
    this.greetingView.onGameLoad = (isFirstLoad) => {
      if (isFirstLoad) {
        const main = document.querySelector(`#main`);
        const intro = this.greetingView.element.querySelector(`#intro`);
        main.removeChild(intro);
      }

      this.greetingView.greetingButton.disabled = ``;
      this.greetingView.greetingSection.classList.remove(`central--blur-end`);
    };
  }
}

export default GreatingController;
