const Models = require('./models')
const fs = require('fs')

const { Pokemon, Team, WishList } = Models

module.exports = async function() {
  const data = fs.readFileSync('db/data/pokemon.csv', 'utf8')
  const lines = data.split('\n')
  const parsed = []
  for (const [i, pokemon] of lines.entries()) {
    const values = pokemon.split(',')
    const obj = {
      number: i + 1,
      name: values[1],
      image: values[2],
      icon: values[3],
      type1: values[4],
      type2: values[5] || undefined,
      hp: values[6],
      atk: values[7],
      def: values[8],
      spAtk: values[9],
      spDef: values[10],
      speed: values[11]
    }
    parsed.push(obj)
  }

  for (const key in Models) {
    await Models[key].deleteMany({})
  }

  for (pokemon of parsed) {
    await Pokemon.create(pokemon).catch(err => console.error(err))
  }

  const testPokemon = await Pokemon.find({
    name: {
      $in: ['Charmander', 'Golbat', 'Nidoking', 'Mewtwo', 'Vulpix', 'Blaziken']
    }
  }).exec()

  await Team.insertMany([
    {
      name: 'TEAM ROCKET',
      p1: testPokemon[0]._id,
      p2: testPokemon[1]._id,
      p3: testPokemon[2]._id,
      p4: testPokemon[3]._id,
      p5: testPokemon[4]._id,
      p6: testPokemon[5]._id
    },
    {
      name: 'TEAM ROCKET2',
      p1: testPokemon[0]._id,
      p2: testPokemon[1]._id,
      p3: testPokemon[2]._id,
      p4: testPokemon[3]._id,
      p5: testPokemon[4]._id,
      p6: testPokemon[5]._id
    }
  ])

  await WishList.insertMany([
    {
      pokemon: testPokemon[3],
      m1: 'Hyper Beam',
      m2: 'Hyper Beam',
      m3: 'Hyper Beam',
      m4: 'Hyper Beam',
      item: 'Oran Berry',
      nature: 'Fabulous',
      caught: false
    },
    {
      pokemon: testPokemon[0],
      m1: 'Hyper Beam',
      m2: 'Hyper Beam',
      m3: 'Hyper Beam',
      m4: 'Hyper Beam',
      item: 'Oran Berry',
      nature: 'Fabulous',
      caught: true
    }
  ])
}
