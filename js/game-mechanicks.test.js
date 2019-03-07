import {assert} from 'chai';
import {GAME_STATE} from './game-data.js';
import {getScore, deleteLive, changeLevel} from './game-mechanicks.js';
import resize from './resize.js';

const notAllAnswers = [`correct`, `correct`, `correct`, `correct`, `correct`, `correct`, `correct`, `correct`, `correct`];

const allFast = [`fast`, `fast`, `fast`, `fast`, `fast`, `fast`, `fast`, `fast`, `fast`, `fast`];
const allSlow = [`slow`, `slow`, `slow`, `slow`, `slow`, `slow`, `slow`, `slow`, `slow`, `slow`];
const allcorrects = [`correct`, `correct`, `correct`, `correct`, `correct`, `correct`, `correct`, `correct`, `correct`, `correct`];
const fiveFast = [`fast`, `fast`, `fast`, `fast`, `fast`, `correct`, `correct`, `correct`, `correct`, `correct`];
const oneFast = [`fast`, `correct`, `correct`, `correct`, `correct`, `correct`, `correct`, `correct`, `correct`, `correct`];
const threeSlow = [`slow`, `slow`, `slow`, `correct`, `correct`, `correct`, `correct`, `correct`, `correct`, `correct`];
const various = [`fast`, `slow`, `slow`, `correct`, `correct`, `fast`, `slow`, `correct`, `correct`, `fast`];

describe(`Подсчет очков`, () => {
  it(`Вернет корректное количество очков`, () => {
    assert.equal(getScore(allcorrects, 3), 1150);
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
    assert.equal(deleteLive(GAME_STATE.lives), 2);
    assert.equal(deleteLive(GAME_STATE.lives), 1);
  });
});

describe(`Изменение уровня игры`, () => {
  it(`Вернет корректный уровень`, () => {
    assert.equal(changeLevel(GAME_STATE, 2).level, 2);
  });

  it(`Вернет ошибку, так как получено отрицательное число`, () => {
    assert.throws(() => changeLevel(GAME_STATE, -1).level, /Значение должно быть больше 0/);
  });
});

const createTestForFrame = (frame) => {
  const assertRatio = (given, expected) => {
    const actual = resize(frame, given);
    assert.deepEqual(actual, expected);
  };

  const createTest = (expected, multiplier) => {
    const given = {
      width: Math.floor(expected.width * multiplier),
      height: Math.floor(expected.height * multiplier)
    };
    it(`shrink ${multiplier}x: ${given.width}x${given.height} => ${expected.width}x${expected.height}`, () => {
      assertRatio(given, expected);
    });
  };

  const sequence = (expected) => {
    createTest(expected, 8);
    createTest(expected, 7);
    createTest(expected, 5);
    createTest(expected, 4);
    createTest(expected, 3);
    createTest(expected, 2);
    createTest(expected, 1);
  };

  describe(`Resize into frame: ${frame.width}x${frame.height}`, () => {

    describe(`when "width === height"`, () => {
      sequence({width: frame.width, height: frame.height});
    });

    describe(`when "width > height"`, () => {
      sequence({width: frame.width, height: Math.floor(frame.height / 2)});
    });

    describe(`when "width < height"`, () => {
      sequence({width: Math.floor(frame.width / 2), height: frame.height});
    });

  });
};

createTestForFrame({width: 256, height: 256});
createTestForFrame({width: 256, height: 128});

createTestForFrame({width: 468, height: 458});
createTestForFrame({width: 705, height: 455});
createTestForFrame({width: 304, height: 455});

