const Sequelize = require('sequelize')
const { db } = require('../index.js')

const Model = Sequelize.Model

//Pokemon model

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
    atk: Sequelize.INTEGER,
    def: Sequelize.INTEGER,
    spatk: Sequelize.INTEGER,
    spdef: Sequelize.INTEGER,
    speed: Sequelize.INTEGER,
    total: {
      type: Sequelize.VIRTUAL,
      get() {
        return (
          this.hp + this.atk + this.def + this.spatk + this.spdef + this.speed
        )
      }
    },
    moveOne: Sequelize.STRING,
    moveTwo: Sequelize.STRING,
    moveThree: Sequelize.STRING,
    moveFour: Sequelize.STRING,
    item: Sequelize.STRING,
    nature: Sequelize.STRING,
    wishList: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    },
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

//Team model

class Team extends Model {}

Team.init(
  {
  id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
  teamId: {
      type: Sequelize.INTEGER
  },
  pokeId: {
    type: Sequelize.INTEGER,
    references: {
      model: Pokemon,
      key: 'id'
    }
  },
  teamName: Sequelize.STRING
},
{
  sequelize: db,
  modelName: 'team'
}
)

// Pokemon and Team associations

Pokemon.belongsToMany(Team, {through: 'PokemonTeam'})
Team.belongsToMany(Pokemon, {through: 'PokemonTeam'})

module.exports.Pokemon = Pokemon
module.exports.Team = Team
