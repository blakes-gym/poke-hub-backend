const Sequelize = require('sequelize')
const { db } = require('../index.js')

const Model = Sequelize.Model

class Pokemon extends Model {}

const types = [
  [
    'normal',
    'fire',
    'water',
    'electric',
    'grass',
    'ice',
    'fighting',
    'poison',
    'ground',
    'flying',
    'psychic',
    'bug',
    'rock',
    'ghost',
    'dragon',
    'dark',
    'steel',
    'fairy'
  ]
]

Pokemon.init(
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    name: Sequelize.STRING,
    sprite: Sequelize.STRING,
    icon: Sequelize.STRING,
    type1: {
      type: Sequelize.STRING,
      validate: {
        isIn: types
      }
    },
    type2: {
      type: Sequelize.STRING,
      validate: {
        isIn: types
      }
    },
    hp: Sequelize.INTEGER,
    attack: Sequelize.INTEGER,
    defense: Sequelize.INTEGER,
    spatk: Sequelize.INTEGER,
    spdef: Sequelize.INTEGER,
    speed: Sequelize.INTEGER,
    total: {
      type: Sequelize.VIRTUAL,
      get() {
        return this.attack + this.defense + this.spatk + this.spdef + this.speed
      }
    },
    wishList: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    }
  },
  {
    sequelize: db,
    modelName: 'pokemon',
    indexes: [
      {
        unique: true,
        fields: ['id']
      }
    ]
  }
)

module.exports = Pokemon
