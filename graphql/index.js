const { ApolloServer, gql } = require('apollo-server-express')
const { Op } = require('sequelize')

const { Pokemon } = require('../db/models')

const typeDefs = gql`
  type Query {
    hello: String
    pokemon(id: ID!): Pokemon
    pokemons(id: [ID!]): [Pokemon]
  }
  type Pokemon {
    id: ID!
    name: String
    sprite: String
    type1: String
    type2: String
    hp: Int
    attack: Int
    defense: Int
    spatk: Int
    spdef: Int
    speed: Int
    wishList: Boolean
  }
`

const resolvers = {
  Query: {
    hello: () => {
      console.log('heyo')
      return 'Hello world!'
    },
    pokemon: (parent, { id }) => {
      console.log('hi')
      return Pokemon.findOne({ where: { id }, raw: true })
    },
    pokemons: (parent, args) => {
      console.log(args)
      Pokemon.findAll({
        where: {
          [Op.or]: args.id
        }
      }).then(data => console.log(data))
    }
  }
}

const graphql = new ApolloServer({ typeDefs, resolvers })

module.exports = graphql
