import {GAME_STATE} from './game-data.js';
import {setNextLevel, deleteLive, changeTime, setDefaultTime, changeAnswers} from './game-logick.js';

class GameModel {
  constructor(gameData, playerName) {
    this.gameData = gameData;
    this.playerName = playerName;
    this.restart();
  }

  get state() {
    return Object.freeze(this._state);
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

  setDefaultTime() {
    this._state = setDefaultTime(this._state);
  }

  changeAnswers(newAnswer) {
    this._state = changeAnswers(this._state, newAnswer);
  }
}

export default GameModel;
