const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  pokemon: { type: mongoose.Schema.Types.ObjectId, ref: 'Pokemon' },
  m1: String,
  m2: String,
  m3: String,
  m4: String,
  item: String,
  nature: String,
  caught: Boolean
})

const WishList = mongoose.model('WishList', schema)

module.exports = WishList
