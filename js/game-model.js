import {GAME_STATE} from './game-data.js';
import {setNextLevel, deleteLive} from './game-logick.js';

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
}

export default GameModel;
