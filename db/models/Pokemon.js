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
