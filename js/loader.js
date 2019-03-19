const GAME_DATA_URL = `https://es.dump.academy/pixel-hunter/questions`;
const DEFAULT_NAME = `player`;
const APP_ID = 56545432;
const STATS_URL = `https://es.dump.academy/pixel-hunter/stats/`;

const toJSON = (response) => response.json();

const checkResponseStatus = (response) => {
  if (response.ok) {
    return response;
  } else {
    throw new Error(`${response.status}`);
  }
};

class Loader {
  static loadGameData() {
    return fetch(GAME_DATA_URL).
      then(checkResponseStatus).
      then(toJSON);
  }

  static loadStats(name = DEFAULT_NAME) {
    return fetch(`${STATS_URL}:${APP_ID}-:${name}`).
      then(checkResponseStatus).
      then(toJSON);
  }

  static saveStats(data, name = DEFAULT_NAME) {
    let {lives, answers} = data;
    data = Object.assign({name, lives, answers});

    const requestSettings = {
      body: JSON.stringify(data),
      headers: {
        [`Content-Type`]: `application/json`,
      },
      method: `POST`
    };

    return fetch(`${STATS_URL}:${APP_ID}-:${name}`, requestSettings).
      then(checkResponseStatus);
  }
}

export default Loader;
