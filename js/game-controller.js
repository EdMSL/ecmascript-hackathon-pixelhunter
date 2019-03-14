import GameView from './game-view.js';
import {renderScreen, isAllRadioGroupsChecked} from './utils.js';
import {checkForCorrect, setNextLevel, deleteLive, changeAnswers, startTimer, stopTimer, timeLeft, changeTime} from './game-logick.js';
import HeaderController from './header-controller.js';
import GameQuestions from './game-questions.js';
import {AnswerTypes} from './game-data.js';
import Application from './application.js';

class GameController {
  constructor(model) {
    this.model = model;
    this._timer = null;
  }

  startGame() {
    this.model.setNextLevel();
    this.gameInit();
    renderScreen(this.gameView.element);
  }

  gameInit() {
    this.question = GameQuestions[this.model._state.level - 1];
    this.gameView = new GameView(this.model._state, this.question);

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
    if (checkForCorrect(this.question, checkedItems)) {
      if (this.model.time > 20) {
        this.model.changeAnswers(AnswerTypes.FAST);
      } else if (this.model.time < 10) {
        this.model.changeAnswers(AnswerTypes.SLOW);
      } else {
        this.model.changeAnswers(AnswerTypes.CORRECT);
      }
    } else {
      this.model.changeAnswers(AnswerTypes.WRONG);
      this.model.deleteLive();
    }
    if (this.model.isCanContinue()) {
      this.startGame();
    } else {
      Application.showStats(this.model._state);
    }
  }

  _changeTime() {
    this.model._changeTime();
    this.gameView.updateHeader(this.model.state);

    if (this.model.state.time === 0) {
      this.onTimeout();
    } else {
      this._timer = setTimeout(() => this._changeTime(), 1000);
    }
  }
}

export default GameController;
