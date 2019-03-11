import StatsView from './stats-view.js';

const getStatsScreen = (state) => {
  const statsScreen = new StatsView(state);

  return statsScreen;
};

export default getStatsScreen;
