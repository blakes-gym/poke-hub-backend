const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  number: Number,
  name: String,
  image: String,
  icon: String,
  type1: String,
  type2: String,
  hp: Number,
  atk: Number,
  def: Number,
  spAtk: Number,
  spDef: Number,
  speed: Number,
  total: Number
})

schema.pre('save', function() {
  this.total =
    this.hp + this.atk + this.def + this.spAtk + this.spDef + this.speed
})

const Pokemon = mongoose.model('Pokemon', schema)

module.exports = Pokemon

// const Model = require('./Model')
// const { String, Number, SERIAL, COMPUTED } = require('../constants/types')

// class Pokemon extends Model {
//   constructor() {
//     super()
//     this.columns = {
//       id: SERIAL,
//       name: String,
//       image: String,
//       icon: String,
//       type1: String,
//       type2: String,
//       hp: Number,
//       atk: Number,
//       def: Number,
//       spAtk: Number,
//       spDef: Number,
//       speed: Number,
//       total: COMPUTED(
//         'integer generated always as (hp + atk + def + spAtk + spDef + speed) stored'
//       )
//     }
//     this.primaryKey = 'id'
//   }
// }

// const pokemon = new Pokemon()

// module.exports = pokemon
