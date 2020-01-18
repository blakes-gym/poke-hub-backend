const { Pokemon } = require('../db/models')

module.exports = {
  Query: {
    hello: () => {
      console.log('heyo')
      return 'Hello world!'
    },
    pokemon: (parent, { id }) =>
      Pokemon.findAll({
        where: { id }
      }),
    all: () => Pokemon.findAll({})
  }
}
