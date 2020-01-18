const types = require('../data/types')

module.exports = (sequelize, DataTypes) => {
  const Pokemon = sequelize.define('pokemon', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    name: DataTypes.STRING,
    sprite: DataTypes.STRING,
    icon: DataTypes.STRING,
    type1: {
      type: DataTypes.STRING,
      validate: {
        isIn: types
      }
    },
    type2: {
      type: DataTypes.STRING,
      validate: {
        isIn: types
      }
    },
    hp: DataTypes.INTEGER,
    atk: DataTypes.INTEGER,
    def: DataTypes.INTEGER,
    spatk: DataTypes.INTEGER,
    spdef: DataTypes.INTEGER,
    speed: DataTypes.INTEGER,
    total: {
      type: DataTypes.VIRTUAL,
      get() {
        return (
          this.hp + this.atk + this.def + this.spatk + this.spdef + this.speed
        )
      }
    }
    // moveOne: DataTypes.STRING,
    // moveTwo: DataTypes.STRING,
    // moveThree: DataTypes.STRING,
    // moveFour: DataTypes.STRING,
    // item: DataTypes.STRING,
    // nature: DataTypes.STRING,
    // wishList: {
    //   type: DataTypes.BOOLEAN,
    //   defaultValue: false
    // }
  })

  // User.associate = function(models) {
  //   models.User.hasMany(models.Task);
  // };

  return Pokemon
}

// const Pokemon = require('./models/Pokemon')
// const Team = require('./models/Team')

// // Pokemon and Team associations

// Pokemon.belongsToMany(Team, { through: 'PokemonTeam' })
// Team.belongsToMany(Pokemon, { through: 'PokemonTeam' })
