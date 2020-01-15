const { ApolloServer } = require('apollo-server-express')
const typeDefs = require('./types')
const resolvers = require('./resolvers')

const graphql = new ApolloServer({ typeDefs, resolvers })

module.exports = graphql