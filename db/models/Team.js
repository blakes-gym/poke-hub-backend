const Sequelize = require('sequelize')
const { db } = require('../index.js')
const Pokemon = require('./Pokemon')

const Model = Sequelize.Model

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

module.exports = Team
