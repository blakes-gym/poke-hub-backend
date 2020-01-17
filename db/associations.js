const Pokemon = require('./models/Pokemon')
const Team = require('./models/Team')

// Pokemon and Team associations

Pokemon.belongsToMany(Team, { through: 'PokemonTeam' })
Team.belongsToMany(Pokemon, { through: 'PokemonTeam' })
