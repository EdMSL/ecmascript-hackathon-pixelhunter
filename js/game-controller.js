import {renderScreen, isAllRadioGroupsChecked} from './utils.js';
import {checkForCorrect} from './game-logick.js';
import {AnswerTypes} from './game-data.js';
import GameView from './game-view.js';
import Application from './application.js';
import resize from './resize.js';

const ONE_SECOND = 1000;

class GameController {
  constructor(model) {
    this.model = model;
    this._timer = null;
  }

  startGame() {
    this.model.setNextLevel();
    this.initGame();
    renderScreen(this.gameView.element);
    this.startTimer();
  }

  initGame() {
    this.question = this.model.gameData[this.model.state.level - 1];
    this.gameView = new GameView(this.model.state, this.question, this.stopTimer);

    this.gameView.goToStartScreen = () => {
      this.stopTimer();
      Application.showWelcome();
    };

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

    this.gameView.onImgLoad = (img, index) => {
      const frame = this.model.gameData[this.model.state.level - 1].answers[index].image;
      const given = {
        width: img.naturalWidth,
        height: img.naturalHeight
      };

      const newImgSize = resize(frame, given);
      img.style.width = `${newImgSize.width}px`;
      img.style.height = `${newImgSize.height}px`;
    };
  }

  checkAnswers(checkedItems) {
    this.stopTimer();

    if (checkForCorrect(this.question, checkedItems)) {
      if (this.model.state.time > 20) {
        this.model.changeAnswers(AnswerTypes.FAST);
      } else if (this.model.state.time < 10) {
        this.model.changeAnswers(AnswerTypes.SLOW);
      } else {
        this.model.changeAnswers(AnswerTypes.CORRECT);
      }
    } else {
      this.model.changeAnswers(AnswerTypes.WRONG);
      this.model.deleteLive();
    }

    this.canContinue();
  }

  canContinue() {
    if (this.model.state.lives > 0 && this.model.state.level < this.model.gameData.length) {
      this.startGame();
    } else {
      Application.showStats(this.model);
    }
  }

  changeRemainingTime() {
    this.model.changeTime();
    this.gameView.updateHeader(this.model.state);
  }

  startTimer() {
    this.model.setDefaultTime();
    this.gameView.updateHeader(this.model.state);
    this._timer = setInterval(() => {
      this.changeRemainingTime();
      if (this.model.state.time === 0) {
        this.onTimeout();
      }
    }, ONE_SECOND);
  }

  stopTimer() {
    clearInterval(this._timer);
  }

  onTimeout() {
    this.stopTimer();
    this.model.changeAnswers(AnswerTypes.WRONG);
    this.model.deleteLive();
    this.model.setDefaultTime();
    this.canContinue();
  }
}

export default GameController;
