const { ApolloServer, gql } = require('apollo-server-express')

const { Pokemon } = require('../db/models')

const typeDefs = gql`
  type Query {
    hello: String
    pokemon(id: ID!): Pokemon
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
    pokemon: (parent, { id }) => Pokemon.findOne({ where: { id }, raw: true })
  }
}

const graphql = new ApolloServer({ typeDefs, resolvers })

module.exports = graphql
