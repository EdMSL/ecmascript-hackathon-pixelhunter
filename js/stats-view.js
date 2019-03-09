import getAnswersListTemplate from './answers-list.js';
import {getScore} from './controls.js';
import {PointsForGameStage, AnswerTypes} from './game-data.js';
import AbstractView from './abstract-view.js';

const extraTypes = [AnswerTypes.FAST, `live`, AnswerTypes.SLOW];

const Titles = {
  FAST: `Бонус за скорость:`,
  SLOW: `Штраф за медлительность:`,
  LIVE: `Бонус за жизни:`,
};

const findCurrentAnswerType = (state, type) => state.answers.filter((answer) => answer === type).length;

const getExtraBonusesAndPenalties = (state) => {
  const quontityFastAnswers = findCurrentAnswerType(state, AnswerTypes.FAST);
  const quontitySlowAnswers = findCurrentAnswerType(state, AnswerTypes.SLOW);
  const quontityLives = state.lives;

  const extraTypesQuontities = [quontityFastAnswers, quontityLives, quontitySlowAnswers];

  return extraTypes.map((extraType, index) => {
    if (extraTypesQuontities[index] > 0) {
      return `
      <tr>
        <td></td>
        <td class="result__extra">${Titles[(extraType).toUpperCase()]}</td>
        <td class="result__extra">${extraTypesQuontities[index]} <span class="stats__result stats__result--fast"></span></td>
        <td class="result__points">× ${PointsForGameStage[(extraType).toUpperCase()]}</td>
        <td class="result__total">${extraTypesQuontities[index] * PointsForGameStage[(extraType).toUpperCase()]}</td>
      </tr>
    `;
    }
    return ``;
  }).join(``);
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
  ${getExtraBonusesAndPenalties(state)}
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

class StatsView extends AbstractView {
  constructor(state) {
    super();
    this.state = state;
  }

  get template() {
    return `
      <section class="result">
        <h2 class="result__title">${getTitle(this.state)}!</h2>
        <table class="result__table">
          ${getResultTableTemplate(this.state)}
        </table>
      </section>
    `;
  }
}

export default StatsView;
