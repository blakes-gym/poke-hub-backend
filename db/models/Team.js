const mongoose = require('mongoose')

const pokemonRef = { type: mongoose.Schema.Types.ObjectId, ref: 'Pokemon' }

const schema = new mongoose.Schema({
  name: String,
  p1: pokemonRef,
  p2: pokemonRef,
  p3: pokemonRef,
  p4: pokemonRef,
  p5: pokemonRef,
  p6: pokemonRef
})

const Team = mongoose.model('Team', schema)

module.exports = Team
