const cheerio = require('cheerio')
const request = require('request')

request(
  {
    method: 'GET',
    url: 'https://bulbapedia.bulbagarden.net/wiki/Charizard_(Pok%C3%A9mon)'
  },
  (err, res, body) => {
    if (err) return console.error(err)

    let $ = cheerio.load(body)

    $('h4').each((i, el) => {
      const text = $(el)
        .children('span')
        .text()
      if (text === 'Base stats') {
        const statsTable = $(el)
          .nextAll('table')
          .eq(0)

        const hp = $(statsTable)
          .find('tbody > tr:nth-child(3) > th > div:nth-child(2)')
          .text()

        console.log(hp)
      }
    })
  }
)
