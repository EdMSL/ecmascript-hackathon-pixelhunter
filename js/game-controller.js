import GameView from './game-view.js';
import {renderScreen, isAllRadioGroupsChecked} from './utils.js';
import {checkForCorrect} from './game-logick.js';
import HeaderController from './header-controller.js';
import GameQuestions from './game-questions.js';
import {AnswerTypes} from './game-data.js';
import Application from './application.js';

const ONE_SECOND = 1000;

class GameController {
  constructor(model) {
    this.model = model;
    this._timer = null;
  }

  startGame() {
    this.stopTimer();
    this.model.setNextLevel();
    this.initGame();
    renderScreen(this.gameView.element);
    this.startTimer();
  }

  initGame() {
    this.question = GameQuestions[this.model._state.level - 1];
    this.gameView = new GameView(this.model._state, this.question, this.stopTimer);

    this.gameView.onChange = () => {
      let QuestionInputsGroups = this.gameView._element.querySelectorAll(`.game__option`);
      let radioGroupsArr = [];

      QuestionInputsGroups.forEach((inputsGroup) => radioGroupsArr.push(inputsGroup.querySelectorAll(`input[type="radio"]`)));

      if (isAllRadioGroupsChecked(radioGroupsArr)) {
        this.checkAnswers(radioGroupsArr);
      } else {
        return;
      }
    };

    this.gameView.onClick = (evt) => {
      const target = evt.target;

      if (target.tagName !== `IMG`) {
        return;
      }

      const images = this.gameView._element.querySelectorAll(`.game__option img`);
      const clickedImgIndex = [...images].indexOf(target);

      this.checkAnswers(clickedImgIndex);
    };
  }

  checkAnswers(checkedItems) {
    this.stopTimer();

    if (checkForCorrect(this.question, checkedItems)) {
      if (this.model.time > 20) {
        this.model.changeAnswers(AnswerTypes.FAST);
        this.getNextScreen();
      } else if (this.model.time < 10) {
        this.model.changeAnswers(AnswerTypes.SLOW);
        this.getNextScreen();
      } else {
        this.model.changeAnswers(AnswerTypes.CORRECT);
        this.getNextScreen();
      }
    } else {
      this.model.changeAnswers(AnswerTypes.WRONG);
      this.model.deleteLive();
      this.getNextScreen();
    }
  }

  getNextScreen() {
    if (this.model.isCanContinue()) {
      this.startGame();
    } else {
      Application.showStats(this.model._state);
    }
  }

  _changeTime() {
    this.model.changeTime();
    this.gameView.updateHeader(this.model._state);

    if (this.model._state.time === 0) {
      this.onTimeout();
    }
  }

  startTimer() {
    // this.model.setDefaultTime();
    this._timer = setInterval(() => this._changeTime(), ONE_SECOND);
  }

  stopTimer() {
    clearInterval(this._timer);
  }

  // updateHeader() {
  //   const main = document.querySelector(`#main`);
  //   const mainf = document.querySelector(`#main > div`);
  //   const newHeader = new HeaderController(this.model._state).headerView.element;
  //   console.log(main)
  //   console.log(newHeader)
  //   this.gameView.header.replaceChild(newHeader, mainf);
  // }

  onTimeout() {
    this.stopTimer();
    this.model.changeAnswers(AnswerTypes.WRONG);
    this.model.deleteLive();
    this.model.setDefaultTime();
    this.getNextScreen();
  }
}

export default GameController;
