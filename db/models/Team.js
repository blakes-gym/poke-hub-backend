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

// const Model = require('./Model')
// const { [{type: mongoose.Schema.Types.ObjectId, ref: 'Pokemon'}], SERIAL, STRING } = require('../constants/types')

// class Team extends Model {
//   constructor() {
//     super()
//     this.columns = {
//       id: SERIAL,
//       name: STRING,
//       p1: [{type: mongoose.Schema.Types.ObjectId, ref: 'Pokemon'}],
//       p2: [{type: mongoose.Schema.Types.ObjectId, ref: 'Pokemon'}],
//       p3: [{type: mongoose.Schema.Types.ObjectId, ref: 'Pokemon'}],
//       p4: [{type: mongoose.Schema.Types.ObjectId, ref: 'Pokemon'}],
//       p5: [{type: mongoose.Schema.Types.ObjectId, ref: 'Pokemon'}],
//       p6: [{type: mongoose.Schema.Types.ObjectId, ref: 'Pokemon'}]
//     }

//     this.foreignKeys = {
//       p1: 'pokemon',
//       p2: 'pokemon',
//       p3: 'pokemon',
//       p4: 'pokemon',
//       p5: 'pokemon',
//       p6: 'pokemon'
//     }
//   }
// }

// const team = new Team()

// module.exports = team
