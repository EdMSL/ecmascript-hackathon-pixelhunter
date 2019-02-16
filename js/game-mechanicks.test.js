import {assert} from 'chai';
import {getTotalPoints} from './game-mechanicks.js';

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
    assert.equal(getTotalPoints(allnormals, 3), 1150);
    assert.equal(getTotalPoints(fiveFast, 3), 1400);
    assert.equal(getTotalPoints(oneFast, 3), 1200);
    assert.equal(getTotalPoints(threeSlow, 3), 1000);
    assert.equal(getTotalPoints(allFast, 3), 1650);
    assert.equal(getTotalPoints(allSlow, 3), 650);
    assert.equal(getTotalPoints(various, 3), 1150);
  });

  it(`Вернет -1, так отвечены не все вопросы`, () => {
    assert.equal(getTotalPoints(notAllAnswers, 3), -1);
  });
});
