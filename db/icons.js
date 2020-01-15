require('dotenv').config()
const cheerio = require('cheerio')
const request = require('request')
const { Pokemon } = require('./models')
const { connect } = require('./index')

icons()

async function icons() {
  await connect()
  request(
    {
      method: 'GET',
      url: `https://www.serebii.net/pokemon/all.shtml`
    },
    (err, res, body) => {
      if (err) reject(console.error(err))

      let $ = cheerio.load(body)

      for (let i = 1; i <= 890; i++) {
        const path = $(
          `#content > main > table > tbody > tr:nth-child(${i +
            2}) > td:nth-child(2) > table > tbody > tr > td > a > img`
        ).attr('src')
        const link = 'https://www.serebii.net' + path
        console.log(link)
        Pokemon.update({ icon: link }, { where: { id: i } })
      }
    }
  )
}
