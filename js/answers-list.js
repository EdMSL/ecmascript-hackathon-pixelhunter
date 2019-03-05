const fillAnswersList = (state) => state.answers.map((element) => `<li class="stats__result stats__result--${element}"></li>`).join(``);

const getAnswersListTemplate = (state) => `
  <ul class="stats">
    ${fillAnswersList(state)}
  </ul>
`;

export default getAnswersListTemplate;
