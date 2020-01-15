const cheerio = require('cheerio');
const request = require('request');
const fs = require('file-system');
const path = require('path');

const pokemonArr = ['Charizard', 'Venusaur', 'Whismur', 'Hitmonlee'];
const file = 'db/pokemon_data.csv';

// function writeData() {
//   // write all pokemon data to a csv
//   if (fs.existsSync(file)) {
//     fs.unlinkSync(file);
//   }

//   // const stream = fs.createWriteStream(file);
//   // stream.on('err', err => console.log(err));
//   // stream.on('close', () => console.log('Done writing all pokemon data!'));

//   fs.writeFile(
//     file,
//     'id,name,sprite,type1,type2,hp,attack,defense,spatk,spdef,speed,wishList'
//   );
// }

function writeAllData() {
  let writeAllData = '';
  for (var i = 0; i < pokemonArr.length; i++) {
    if (i === pokemonArr.length - 1) {
      Promise.all([
        getID(pokemonArr[i]),
        getSprite(pokemonArr[i]),
        getTypes(pokemonArr[i]),
        getStats(pokemonArr[i])
      ])
        .then(resultArr => {
          writeAllData += resultArr.join(',');
          return writeAllData;
        })
        .then(resultStr => {
          fs.writeFile(file, resultStr, err => {
            if (err) {
              console.log('err', err);
            } else {
              console.log('Done writing!');
            }
          });
        });
    } else {
      // writeAllData += createPokemonData(pokemonArr[i]);
      Promise.all([
        getID(pokemonArr[i]),
        getSprite(pokemonArr[i]),
        getTypes(pokemonArr[i]),
        getStats(pokemonArr[i])
      ]).then(resultArr => {
        resultArr.join(',');
        writeAllData += resultArr + '\n';
      });
    }
  }
  console.log(writeAllData);
  return writeAllData;
}
writeAllData();

function getID(pokemon) {
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
        resolve(id + ',' + pokemon);
      }
    );
  });
}

function getStats(pokemon) {
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
}

function getTypes(pokemon) {
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
}

function getSprite(pokemon) {
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
}

async function createPokemonData(pokemon) {
  const id = await getID(pokemon);
  const sprite = await getSprite(pokemon);
  const types = await getTypes(pokemon);
  const stats = await getStats(pokemon);

  return (
    id + ',' + pokemon + ',' + sprite + ',' + types + ',' + stats + ',' + 'f'
  );
}
// console.log(createPokemonData('Charizard'));
