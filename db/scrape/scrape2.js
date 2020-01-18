const cheerio = require('cheerio')
const request = require('request')
const fs = require('file-system')

const file = 'db/pokemon.csv'

request(
  {
    method: 'GET',
    url: `https://www.serebii.net/pokemon/all.shtml`
  },
  async (err, res, body) => {
    if (err) reject(console.error(err))

    let $ = cheerio.load(body)

    for (let i = 798; i < 890; i++) {
      const row = i + 3
      const id = i + 1
      const icon =
        'https://www.serebii.net/' +
        $(
          `.dextable > tbody:nth-child(1) > tr:nth-child(${row}) > td:nth-child(2) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > a:nth-child(1) > img:nth-child(1)`
        ).attr('src')
      const name = $(
        `.dextable > tbody:nth-child(1) > tr:nth-child(${row}) > td:nth-child(3) > a:nth-child(1)`
      )
        .text()
        .trim()
      console.log(name)
      const sprite = await getSprite(name)
      const type1 = $(
        `.dextable > tbody:nth-child(1) > tr:nth-child(${row}) > td:nth-child(4) > a:nth-child(1) > img:nth-child(1)`
      )
        .attr('src')
        .split('/')[3]
        .split('.')[0]
      let type2 = $(
        `.dextable > tbody:nth-child(1) > tr:nth-child(${row}) > td:nth-child(4) > a:nth-child(2) > img:nth-child(1)`
      ).attr('src')
      if (type2) type2 = type2.split('/')[3].split('.')[0]
      const hp = $(
        `.dextable > tbody:nth-child(1) > tr:nth-child(${row}) > td:nth-child(6)`
      ).text()
      const atk = $(
        `.dextable > tbody:nth-child(1) > tr:nth-child(${row}) > td:nth-child(7)`
      ).text()
      const def = $(
        `.dextable > tbody:nth-child(1) > tr:nth-child(${row}) > td:nth-child(8)`
      ).text()
      const spatk = $(
        `.dextable > tbody:nth-child(1) > tr:nth-child(${row}) > td:nth-child(9)`
      ).text()
      const spdef = $(
        `.dextable > tbody:nth-child(1) > tr:nth-child(${row}) > td:nth-child(10)`
      ).text()
      const speed = $(
        `.dextable > tbody:nth-child(1) > tr:nth-child(${row}) > td:nth-child(11)`
      ).text()

      const data = [
        id,
        name,
        sprite,
        icon,
        type1,
        type2,
        hp,
        atk,
        def,
        spatk,
        spdef,
        speed
      ]
      const joined = data.join(',')

      fs.appendFileSync(file, joined + '\n')
    }
  }
)

function getSprite(pokemon) {
  return new Promise((resolve, reject) => {
    const url =
      {
        ['Nidoran♀']:
          'https://bulbapedia.bulbagarden.net/wiki/Nidoran%E2%99%80_(Pok%C3%A9mon)',
        ['Nidoran♂']:
          'https://bulbapedia.bulbagarden.net/wiki/Nidoran%E2%99%82_(Pok%C3%A9mon)'
      }[pokemon] ||
      `https://bulbapedia.bulbagarden.net/wiki/${pokemon}_(Pokémon)`
    request(
      {
        method: 'GET',
        url
      },
      (err, res, body) => {
        if (err) reject(console.error(err))

        let $ = cheerio.load(body)
        let sprite =
          'https:' +
          $(
            '#mw-content-text > table:nth-child(2) > tbody > tr:nth-child(1) > td > table > tbody > tr:nth-child(2) > td > table > tbody > tr:nth-child(1) > td > a > img'
          )[0].attribs.src

        resolve(sprite)
      }
    )
  })
}
