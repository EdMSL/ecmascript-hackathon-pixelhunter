import HeaderView from './header-view.js';

const getHeaderScreen = (state) => {
  const headerScreen = new HeaderView(state);

  return headerScreen;
};

export default getHeaderScreen;
