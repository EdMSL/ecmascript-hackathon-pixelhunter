import {makeElementFromTemplate} from './utils.js';
import getAnswersListTemplate from './answers-list.js';
import {getScore} from './controls.js';
import {PointsForGameStage} from './game-data.js';

const getTitle = (state) => state.lives > 0 ? `Победа` : `Поражение`;

const getFailTemplate = (state) => `
  <tr>
    <td>
      ${getAnswersListTemplate(state)}
    </td>
    <td class="result__total"></td>
    <td class="result__total  result__total--final">fail</td>
  </tr>
`;

const getWinTemplate = (state) => `
  <tr>
    <td colspan="3">
      ${getAnswersListTemplate(state)}
    </td>
    <td class="result__points">× ${PointsForGameStage.CORRECT}</td>
    <td class="result__total">1000</td>
  </tr>
  <tr>
    <td></td>
    <td class="result__extra">Бонус за скорость:</td>
    <td class="result__extra">1 <span class="stats__result stats__result--fast"></span></td>
    <td class="result__points">× ${PointsForGameStage.FAST}</td>
    <td class="result__total">50</td>
  </tr>
  <tr>
    <td></td>
    <td class="result__extra">Бонус за жизни:</td>
    <td class="result__extra">${state.lives} <span class="stats__result stats__result--alive"></span></td>
    <td class="result__points">× ${PointsForGameStage.LIVE}</td>
    <td class="result__total">${state.lives * PointsForGameStage.LIVE}</td>
  </tr>
  <tr>
    <td></td>
    <td class="result__extra">Штраф за медлительность:</td>
    <td class="result__extra">2 <span class="stats__result stats__result--slow"></span></td>
    <td class="result__points">× ${Math.abs(PointsForGameStage.SLOW)}</td>
    <td class="result__total">-100</td>
  </tr>
  <tr>
    <td colspan="5" class="result__total  result__total--final">${getScore(state)}</td>
  </tr>
`;

const getResultTableTemplate = (state) => {
  let template;

  if (state.lives < 1) {
    template = getFailTemplate(state);
  } else {
    template = getWinTemplate(state);
  }

  return template;
};

const getStatsScreen = (state) => {
  const statsScreen = makeElementFromTemplate(`
  <section class="result">
    <h2 class="result__title">${getTitle(state)}!</h2>
    <table class="result__table">
      ${getResultTableTemplate(state)}
    </table>
  </section>
  `);

  return statsScreen;
};

{/*
<section class="result">
  <h2 class="result__title">Победа!</h2>
  <table class="result__table">
    <tr>
      <td class="result__number">1.</td>
      <td colspan="2">
        <ul class="stats">
          <li class="stats__result stats__result--wrong"></li>
          <li class="stats__result stats__result--slow"></li>
          <li class="stats__result stats__result--fast"></li>
          <li class="stats__result stats__result--correct"></li>
          <li class="stats__result stats__result--wrong"></li>
          <li class="stats__result stats__result--unknown"></li>
          <li class="stats__result stats__result--slow"></li>
          <li class="stats__result stats__result--unknown"></li>
          <li class="stats__result stats__result--fast"></li>
          <li class="stats__result stats__result--unknown"></li>
        </ul>
      </td>
      <td class="result__points">× 100</td>
      <td class="result__total">900</td>
    </tr>
    <tr>
      <td></td>
      <td class="result__extra">Бонус за скорость:</td>
      <td class="result__extra">1 <span class="stats__result stats__result--fast"></span></td>
      <td class="result__points">× 50</td>
      <td class="result__total">50</td>
    </tr>
    <tr>
      <td></td>
      <td class="result__extra">Бонус за жизни:</td>
      <td class="result__extra">2 <span class="stats__result stats__result--alive"></span></td>
      <td class="result__points">× 50</td>
      <td class="result__total">100</td>
    </tr>
    <tr>
      <td></td>
      <td class="result__extra">Штраф за медлительность:</td>
      <td class="result__extra">2 <span class="stats__result stats__result--slow"></span></td>
      <td class="result__points">× 50</td>
      <td class="result__total">-100</td>
    </tr>
    <tr>
      <td colspan="5" class="result__total  result__total--final">950</td>
    </tr>
  </table>
  <table class="result__table">
    <tr>
      <td class="result__number">2.</td>
      <td>
        <ul class="stats">
          <li class="stats__result stats__result--wrong"></li>
          <li class="stats__result stats__result--slow"></li>
          <li class="stats__result stats__result--fast"></li>
          <li class="stats__result stats__result--correct"></li>
          <li class="stats__result stats__result--wrong"></li>
          <li class="stats__result stats__result--unknown"></li>
          <li class="stats__result stats__result--slow"></li>
          <li class="stats__result stats__result--wrong"></li>
          <li class="stats__result stats__result--fast"></li>
          <li class="stats__result stats__result--wrong"></li>
        </ul>
      </td>
      <td class="result__total"></td>
      <td class="result__total  result__total--final">fail</td>
    </tr>
  </table>
  <table class="result__table">
    <tr>
      <td class="result__number">3.</td>
      <td colspan="2">
        <ul class="stats">
          <li class="stats__result stats__result--wrong"></li>
          <li class="stats__result stats__result--slow"></li>
          <li class="stats__result stats__result--fast"></li>
          <li class="stats__result stats__result--correct"></li>
          <li class="stats__result stats__result--wrong"></li>
          <li class="stats__result stats__result--unknown"></li>
          <li class="stats__result stats__result--slow"></li>
          <li class="stats__result stats__result--unknown"></li>
          <li class="stats__result stats__result--fast"></li>
          <li class="stats__result stats__result--unknown"></li>
        </ul>
      </td>
      <td class="result__points">× 100</td>
      <td class="result__total">900</td>
    </tr>
    <tr>
      <td></td>
      <td class="result__extra">Бонус за жизни:</td>
      <td class="result__extra">2 <span class="stats__result stats__result--alive"></span></td>
      <td class="result__points">× 50</td>
      <td class="result__total">100</td>
    </tr>
    <tr>
      <td colspan="5" class="result__total  result__total--final">950</td>
    </tr>
  </table>
  </section>

*/}

export default getStatsScreen;
