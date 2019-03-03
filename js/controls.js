import {renderScreen} from './utils.js';
import getIntroScreen from './intro.js';

const onToMainScreenButtonClick = (evt) => {
  evt.preventDefault();
  renderScreen([getIntroScreen()]);
};

const isRadioGroupChecked = (radioCollection) => [...radioCollection].some((element) => element.checked);

const isAllRadioGroupsChecked = (radioGroups) => radioGroups.every((radioGroup) => isRadioGroupChecked(radioGroup));

const checkRadioAnswers = (gameQuestion, radioGroups) => {
  let answers = [];
  [...radioGroups].forEach((element) => {
    element.forEach((elem) => {
      if (elem.checked) {
        answers.push(elem.value);
      }
    });
  });
  return gameQuestion.every((question, index) => {
    return question.type === answers[index];
  });
};

const checkClickAnswer = (gameQuestion, answer) => gameQuestion[answer].type === `paint`;

const checkForCorrect = (question, checkedItems) => {
  if (question.length === 2 || question.length === 1) {
    return checkRadioAnswers(question, checkedItems);
  } else if (question.length === 3) {
    return checkClickAnswer(question, checkedItems);
  } else {
    return -1;
  }
};

export {
  onToMainScreenButtonClick,
  isAllRadioGroupsChecked,
  checkForCorrect
};
