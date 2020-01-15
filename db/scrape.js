const cheerio = require('cheerio');
const request = require('request');
const fs = require('file-system');
const path = require('path');

const pokemonArr = ['Charizard', 'Venusaur', 'Whismur', 'Hitmonlee'];

const writeData = function() {
  // write all pokemon data to a csv
  if (fs.existsSync(file)) {
    fs.unlinkSync(file);
  }

  const stream = fs.createWriteStream(file);
  stream.on('err', err => console.log(err));
  stream.on('close', () => console.log('Done writing all pokemon data!'));

  for (var i = 0; i < pokemonArr.length; i++) {
    stream.write;
  }
};

const getID = function(pokemon) {
  return new Promise(function(resolve, reject) {
    request(
      {
        method: 'GET',
        url: `https://bulbapedia.bulbagarden.net/wiki/${pokemon}_(Pok%C3%A9mon)`
      },
      (err, res, body) => {
        if (err) reject(console.error(err));

        let $ = cheerio.load(body);

        let id = $(
          '#mw-content-text > table:nth-child(2) > tbody > tr:nth-child(1) > td > table > tbody > tr:nth-child(1) > th > big > big > a > span'
        ).text();
        resolve(id);
      }
    );
  });
};

const getStats = function(pokemon) {
  return new Promise(function(resolve, reject) {
    request(
      {
        method: 'GET',
        url: `https://bulbapedia.bulbagarden.net/wiki/${pokemon}_(Pok%C3%A9mon)`
      },
      (err, res, body) => {
        if (err) reject(console.error(err));

        let stats = '';
        let $ = cheerio.load(body);

        $('h4').each((i, el) => {
          const text = $(el)
            .children('span')
            .text();
          if (text === 'Base stats') {
            const statsTable = $(el)
              .nextAll('table')
              .eq(0);

            const hp = $(statsTable)
              .find('tbody > tr:nth-child(3) > th > div:nth-child(2)')
              .text();

            const atk = $(statsTable)
              .find('tbody > tr:nth-child(4) > th > div:nth-child(2)')
              .text();

            const def = $(statsTable)
              .find('tbody > tr:nth-child(5) > th > div:nth-child(2)')
              .text();

            const spatk = $(statsTable)
              .find('tbody > tr:nth-child(6) > th > div:nth-child(2)')
              .text();

            const spdef = $(statsTable)
              .find('tbody > tr:nth-child(7) > th > div:nth-child(2)')
              .text();

            const spd = $(statsTable)
              .find('tbody > tr:nth-child(8) > th > div:nth-child(2)')
              .text();

            const total = $(statsTable)
              .find('tbody > tr:nth-child(9) > th > div:nth-child(2)')
              .text();
            stats =
              hp +
              ',' +
              atk +
              ',' +
              def +
              ',' +
              spatk +
              ',' +
              spdef +
              ',' +
              spd;
            resolve(stats);
          }
        });
      }
    );
  });
};

const getTypes = function(pokemon) {
  return new Promise(function(resolve, reject) {
    request(
      {
        method: 'GET',
        url: `https://bulbapedia.bulbagarden.net/wiki/${pokemon}_(Pok%C3%A9mon)`
      },
      (err, res, body) => {
        if (err) reject(console.error(err));

        let $ = cheerio.load(body);

        let type1 = $(
          '#mw-content-text > table:nth-child(2) > tbody > tr:nth-child(2) > td > table > tbody > tr > td:nth-child(1) > table > tbody > tr > td:nth-child(1) > a > span > b'
        ).text();
        let type2 = $(
          '#mw-content-text > table:nth-child(2) > tbody > tr:nth-child(2) > td > table > tbody > tr > td:nth-child(1) > table > tbody > tr > td:nth-child(2) > a > span > b'
        ).text();
        if (type2 === 'Unknown') {
          type2 = null;
        }
        resolve(type1 + ',' + type2);
      }
    );
  });
};

const getSprite = function(pokemon) {
  return new Promise(function(resolve, reject) {
    request(
      {
        method: 'GET',
        url: `https://bulbapedia.bulbagarden.net/wiki/${pokemon}_(Pok%C3%A9mon)`
      },
      (err, res, body) => {
        if (err) reject(console.error(err));

        let $ = cheerio.load(body);
        let sprite =
          'https:' +
          $(
            '#mw-content-text > table:nth-child(2) > tbody > tr:nth-child(1) > td > table > tbody > tr:nth-child(2) > td > table > tbody > tr:nth-child(1) > td > a > img'
          )[0].attribs.src;

        resolve(sprite);
      }
    );
  });
};

async function createPokemonData(pokemon) {
  const id = await getID(pokemon);
  const sprite = await getSprite(pokemon);
  const types = await getTypes(pokemon);
  const stats = await getStats(pokemon);

  console.log(
    id +
      ',' +
      pokemon +
      ',' +
      sprite +
      ',' +
      types +
      ',' +
      stats +
      ',' +
      'f' +
      '\n'
  );
}
createPokemonData('Charmander');
