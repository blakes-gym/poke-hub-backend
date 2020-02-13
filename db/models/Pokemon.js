const Model = require('./Model')
const { STRING, INT, SERIAL, COMPUTED } = require('../constants/types')

class Pokemon extends Model {
  constructor() {
    super()
    this.columns = {
      id: SERIAL,
      name: STRING,
      image: STRING,
      icon: STRING,
      type1: STRING,
      type2: STRING,
      hp: INT,
      atk: INT,
      def: INT,
      spAtk: INT,
      spDef: INT,
      speed: INT,
      total: COMPUTED(
        'integer generated always as (hp + atk + def + spAtk + spDef + speed) stored'
      )
    }
    this.primaryKey = 'id'
  }
}

const pokemon = new Pokemon()

module.exports = pokemon
