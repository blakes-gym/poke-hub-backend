const { Pokemon } = require('./models')
const data = require('./dummyData')
const _ = require('lodash')

module.exports = async function() {
  const promises = data.map(async pokemon =>
    Pokemon.create({
      id: pokemon.DexNo,
      type1: pokemon.Type[0].toLowerCase(),
      type2: get(pokemon.Type[1]),
      name: pokemon.Name,
      hp: pokemon.Stats.HP,
      attack: pokemon.Stats.Attack,
      defense: pokemon.Stats.Defense,
      spatk: pokemon.Stats['Sp. Atk'],
      spdef: pokemon.Stats['Sp. Def'],
      speed: pokemon.Stats.Speed,
      sprite: pokemon.Sprite
    })
  )

  await Promise.all(promises).catch(err => console.error(err))
}

function get(data) {
  if (data) return data.toLowerCase()
}
