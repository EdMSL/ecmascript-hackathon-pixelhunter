import {renderScreen} from './utils.js';
import getHeader from './header.js';
import getGameScreen from './game-screen.js';
import getStatsScreen from './stats.js';
import GAME_STATE from './game-data.js';

const renderGameScreen = (state) => {
  if (state.lives > 0 && state.level <= 10) {
    renderScreen([getHeader(state, true), getGameScreen(state)]);
  } else {
    renderScreen([getStatsScreen()]);
  }
};

export default renderGameScreen;
