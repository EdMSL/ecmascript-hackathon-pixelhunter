import IntroView from './intro-view.js';
import {renderScreen} from './utils.js';
import getHeaderScreen from './header-controller.js';
import getGreetingScreen from './greeting-controller.js';

class Intro {
  constructor() {
    this.introScreen = new IntroView();
    this.introScreen.onClick = () => renderScreen([getHeaderScreen().element, getGreetingScreen().element]);
  }
}

export default Intro;
