const { gql } = require('apollo-server-express')

module.exports = gql`
  type Query {
    hello: String
    pokemon(id: [ID!]): [Pokemon]
    all: [Pokemon]
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
