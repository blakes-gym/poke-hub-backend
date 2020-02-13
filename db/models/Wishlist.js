const Model = require('./Model')
const { STRING, BOOL, SERIAL } = require('../constants/types')

class WishList extends Model {
  constructor() {
    super()
    this.columns = {
      id: SERIAL,
      m1: STRING,
      m2: STRING,
      m3: STRING,
      m4: STRING,
      item: STRING,
      nature: STRING,
      caught: BOOL
    }
    this.primaryKey = 'id'
  }
}

const wishList = new WishList()

module.exports = wishList
