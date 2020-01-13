const Sequelize = require('sequelize')
const { db } = require('../index')

const Model = Sequelize.Model
class Pokemon extends Model {}
Pokemon.init(
  {
    name: Sequelize.STRING
  },
  {
    db
  }
)
