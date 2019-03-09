import {onToMainScreenButtonClick} from './controls.js';
import HeaderView from './header-view.js';

const getHeaderScreen = (state) => {
  const headerScreen = new HeaderView(state);

  headerScreen.onClick = (evt) => onToMainScreenButtonClick(evt);

  return headerScreen;
};

export default getHeaderScreen;
