'use strict';

const main = document.querySelector(`#main`);

const greetingTemplate = document.querySelector(`#greeting`).content.querySelector(`.greeting`);
const rulesTemplate = document.querySelector(`#rules`).content;
const gameOneTemplate = document.querySelector(`#game-2`).content;
const gameTwoTemplate = document.querySelector(`#game-1`).content;
const gameThreeTemplate = document.querySelector(`#game-3`).content;
const statsTemplate = document.querySelector(`#stats`).content;
const statsMoreTemplate = document.querySelector(`#stats-more`).content;
const statsSingleTemplate = document.querySelector(`#stats-single`).content;
const modalErrorTemplate = document.querySelector(`#modal-error`).content.querySelector(`.modal`);
const modalConfirmTemplate = document.querySelector(`#modal-confirm`).content.querySelector(`.modal`);

const screensTemplates = [greetingTemplate, rulesTemplate, gameOneTemplate, gameTwoTemplate, gameThreeTemplate, statsTemplate, statsMoreTemplate, statsSingleTemplate, modalErrorTemplate, modalConfirmTemplate];

const leftArrow = document.querySelector(`.arrows__btn:first-of-type`);
const rightArrow = document.querySelector(`.arrows__btn:last-of-type`);

let counter = 0;

const clearScreen = () => {
  main.innerHTML = ``;
};

const setScreen = (number) => {
  clearScreen();
  main.appendChild(screensTemplates[number].cloneNode(true));
};

const setPrewiousScreen = () => {
  if (counter !== 0) {
    counter--;
    setScreen(counter);
  } else {
    return;
  }
};

const setNextScreen = () => {
  if (counter !== (screensTemplates.length - 1)) {
    counter++;
    setScreen(counter);
  } else {
    return;
  }
};

const onDocumentLeftArrowPress = (evt) => {
  if (evt.keyCode === 37) {
    setPrewiousScreen();
  } else if (evt.keyCode === 39) {
    setNextScreen();
  } else {
    return;
  }
};

const onLeftArrowClick = () => {
  setPrewiousScreen();
};

const onRightArrowClick = () => {
  setNextScreen();
};

setScreen(0);
document.addEventListener(`keydown`, onDocumentLeftArrowPress);
leftArrow.addEventListener(`click`, onLeftArrowClick);
rightArrow.addEventListener(`click`, onRightArrowClick);
