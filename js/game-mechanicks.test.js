import {assert} from 'chai';
import START_GAME_STATE from './game-data.JS';
import {getScore, deleteLive, changeLevel} from './game-mechanicks.js';

const notAllAnswers = [`normal`, `normal`, `normal`, `normal`, `normal`, `normal`, `normal`, `normal`, `normal`];

const allFast = [`fast`, `fast`, `fast`, `fast`, `fast`, `fast`, `fast`, `fast`, `fast`, `fast`];
const allSlow = [`slow`, `slow`, `slow`, `slow`, `slow`, `slow`, `slow`, `slow`, `slow`, `slow`];
const allnormals = [`normal`, `normal`, `normal`, `normal`, `normal`, `normal`, `normal`, `normal`, `normal`, `normal`];
const fiveFast = [`fast`, `fast`, `fast`, `fast`, `fast`, `normal`, `normal`, `normal`, `normal`, `normal`];
const oneFast = [`fast`, `normal`, `normal`, `normal`, `normal`, `normal`, `normal`, `normal`, `normal`, `normal`];
const threeSlow = [`slow`, `slow`, `slow`, `normal`, `normal`, `normal`, `normal`, `normal`, `normal`, `normal`];
const various = [`fast`, `slow`, `slow`, `normal`, `normal`, `fast`, `slow`, `normal`, `normal`, `fast`];

describe(`Подсчет очков`, () => {
  it(`Вернет корректное количество очков`, () => {
    assert.equal(getScore(allnormals, 3), 1150);
    assert.equal(getScore(fiveFast, 3), 1400);
    assert.equal(getScore(oneFast, 3), 1200);
    assert.equal(getScore(threeSlow, 3), 1000);
    assert.equal(getScore(allFast, 3), 1650);
    assert.equal(getScore(allSlow, 3), 650);
    assert.equal(getScore(various, 3), 1150);
  });

  it(`Вернет -1, так как получены ответы не на все вопросы`, () => {
    assert.equal(getScore(notAllAnswers, 3), -1);
  });
});

describe(`Изменение кол-ва жизней`, () => {
  it(`Вернет корректное количество жизней`, () => {
    assert.equal(deleteLive(START_GAME_STATE.lives), 1);
    assert.equal(deleteLive(START_GAME_STATE.lives), 1);
  });
});

describe(`Изменение уровня игры`, () => {
  it(`Вернет корректный уровень`, () => {
    assert.equal(changeLevel(START_GAME_STATE, 2).level, 2);
  });

  it(`Вернет ошибку, так как получено отрицательное число`, () => {
    assert.throws(() => changeLevel(START_GAME_STATE, -1).level, /Значение должно быть больше 0/);
  });
});
