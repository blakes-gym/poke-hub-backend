const cheerio = require('cheerio');
const request = require('request');

const pokemonArr = ['Charmander', 'Venusaur', 'Haunter'];
const pokemonSprites = {};

// get all sprite urls from bulbapedia
for (var pokemon of pokemonArr) {
  request(
    {
      method: 'GET',
      url: `https://bulbapedia.bulbagarden.net/wiki/${pokemon}_(Pok%C3%A9mon)`
    },
    (err, res, body) => {
      if (err) return console.error(err);

      let $ = cheerio.load(body);

      let name = $(
        '#mw-content-text > table:nth-child(2) > tbody > tr:nth-child(1) > td > table > tbody > tr:nth-child(1) > td > table > tbody > tr > td:nth-child(1) > big > big > b'
      ).text();
      let sprite =
        'https:' +
        $(
          '#mw-content-text > table:nth-child(2) > tbody > tr:nth-child(1) > td > table > tbody > tr:nth-child(2) > td > table > tbody > tr:nth-child(1) > td > a > img'
        )[0].attribs.src;

      pokemonSprites[name] = sprite;
    }
  );
}

// get everything else from pokemondb
request(
  {
    method: 'GET',
    url: `https://pokemondb.net/pokedex/charmander`
  },
  (err, res, body) => {
    if (err) return console.error(err);

    let $ = cheerio.load(body);
    $('h2').each((i, elem) => {
      console.log($(this).text());
    });

    // let attack = $('#mw-content-text > table:nth-child(125)');
    // let defense = $('#mw-content-text > table:nth-child(125)');
    // let spatk = $('#mw-content-text > table:nth-child(125)');
    // let spdef = $('#mw-content-text > table:nth-child(125)');
    // let speed = $('#mw-content-text > table:nth-child(125)');
    // console.log('hp', hp);
  }
);
// let id = $(
//   '#mw-content-text > table:nth-child(2) > tbody > tr:nth-child(1) > td > table > tbody > tr:nth-child(1) > th > big > big > a > span'
// ).text();
// let name = $(
//   '#mw-content-text > table:nth-child(2) > tbody > tr:nth-child(1) > td > table > tbody > tr:nth-child(1) > td > table > tbody > tr > td:nth-child(1) > big > big > b'
// ).text();
// let sprite = $(
//   '#mw-content-text > table:nth-child(2) > tbody > tr:nth-child(1) > td > table > tbody > tr:nth-child(2) > td > table > tbody > tr:nth-child(1) > td > a > img'
// )[0].attribs.src;

function getTypes() {
  let type1 = $(
    '#mw-content-text > table:nth-child(2) > tbody > tr:nth-child(2) > td > table > tbody > tr > td:nth-child(1) > table > tbody > tr > td:nth-child(1) > a > span > b'
  ).text();
  let type2 = $(
    '#mw-content-text > table:nth-child(2) > tbody > tr:nth-child(2) > td > table > tbody > tr > td:nth-child(1) > table > tbody > tr > td:nth-child(2) > a > span > b'
  ).text();
  if (type2 === 'Unknown') {
    type2 = null;
  }
  return type1 + ',' + type2;
}
// function getStats() {
//   let hp = $(
//     '#mw-content-text > table:nth-child(119) > tbody > tr:nth-child(3) > th > div:nth-child(2)'
//   ).text();
//   // let attack = $('#mw-content-text > table:nth-child(125)');
//   // let defense = $('#mw-content-text > table:nth-child(125)');
//   // let spatk = $('#mw-content-text > table:nth-child(125)');
//   // let spdef = $('#mw-content-text > table:nth-child(125)');
//   // let speed = $('#mw-content-text > table:nth-child(125)');
//   return hp;
// }
