require('dotenv').config()

const express = require('express')
const cors = require('cors')

const graphql = require('./graphql')
const { connect } = require('./db')
const { Pokemon } = require('./db/models')

const app = express()
const PORT = process.env.PORT || 4000

graphql.applyMiddleware({ app })
app.use(cors())

app.get('/api/pokemon', (req, res) => {
  Pokemon.findAll({})
    .then(data => res.send(data))
    .catch(err => res.status(500).send(err))
})

app.listen(PORT, () => {
  console.log(`\nlistening on ${PORT}`)
  connect()
})
