import {makeElementFromTemplate} from './utils.js';
import getAnswersListTemplate from './answers-list.js';
import {getScore} from './controls.js';
import {PointsForGameStage, AnswerTypes} from './game-data.js';

const findCurrentAnswerType = (state, type) => state.answers.filter((answer) => answer === type).length;

const getSpeedBonus = (state) => {
  const speedAnswers = findCurrentAnswerType(state, AnswerTypes.FAST);
  if (speedAnswers > 0) {
    return `
      <tr>
        <td></td>
        <td class="result__extra">Бонус за скорость:</td>
        <td class="result__extra">${speedAnswers} <span class="stats__result stats__result--fast"></span></td>
        <td class="result__points">× ${PointsForGameStage[(AnswerTypes.FAST).toUpperCase()]}</td>
        <td class="result__total">${speedAnswers * PointsForGameStage[(AnswerTypes.FAST).toUpperCase()]}</td>
      </tr>
    `;
  }
  return ``;
};

const getSlownessPenalty = (state) => {
  const slowAnswers = findCurrentAnswerType(state, AnswerTypes.FAST);
  if (findCurrentAnswerType(state, AnswerTypes.SLOW) > 0) {
    return `
      <tr>
        <td></td>
        <td class="result__extra">Штраф за медлительность:</td>
        <td class="result__extra">${slowAnswers} <span class="stats__result stats__result--slow"></span></td>
        <td class="result__points">× ${Math.abs(PointsForGameStage[(AnswerTypes.SLOW).toUpperCase()])}</td>
        <td class="result__total">${slowAnswers * PointsForGameStage[(AnswerTypes.FAST).toUpperCase()]}</td>
      </tr>
    `;
  }
  return ``;
};

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
    <td class="result__points">× ${PointsForGameStage[(AnswerTypes.CORRECT).toUpperCase()]}</td>
    <td class="result__total">${findCurrentAnswerType(state, AnswerTypes.CORRECT) * PointsForGameStage[(AnswerTypes.CORRECT).toUpperCase()]}</td>
  </tr>
  ${getSpeedBonus(state)}
  <tr>
    <td></td>
    <td class="result__extra">Бонус за жизни:</td>
    <td class="result__extra">${state.lives} <span class="stats__result stats__result--alive"></span></td>
    <td class="result__points">× ${PointsForGameStage.LIVE}</td>
    <td class="result__total">${state.lives * PointsForGameStage.LIVE}</td>
  </tr>
  ${getSlownessPenalty(state)}
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

export default getStatsScreen;
