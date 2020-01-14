const cheerio = require('cheerio');
const request = require('request');

request(
  {
    method: 'GET',
    url: 'https://bulbapedia.bulbagarden.net/wiki/Charmander_(Pok%C3%A9mon)'
  },
  (err, res, body) => {
    if (err) return console.error(err);

    let $ = cheerio.load(body);

    let title = $('#mw-content-text > table:nth-child(125)');

    console.log(title);
  }
);
