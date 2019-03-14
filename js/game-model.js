import {GAME_STATE} from './game-data.js';
import GameQuestions from './game-questions.js';
import {setNextLevel, deleteLive, changeTime, changeAnswers} from './game-logick.js';

class GameModel {
  constructor() {
    this.restart();
  }

  restart() {
    this._state = GAME_STATE;
  }

  setNextLevel() {
    this._state = setNextLevel(this._state);
  }

  deleteLive() {
    this._state = deleteLive(this._state);
  }

  changeTime() {
    this._state = changeTime(this._state);
  }

  changeAnswers(newAnswer) {
    this._state = changeAnswers(this._state, newAnswer);
  }

  isCanContinue() {
    return this._state.lives > 0 && this._state.level <= GameQuestions.length;
  }
}

export default GameModel;
