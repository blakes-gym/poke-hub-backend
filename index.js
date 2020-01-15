require('dotenv').config()

const express = require('express')
const cors = require('cors')

const graphql = require('./graphql')

const { connect } = require('./db')

const app = express()
const PORT = process.env.PORT || 4000

graphql.applyMiddleware({ app })
app.use(cors())

app.listen(PORT, () => {
  console.log(`\nlistening on ${PORT}`)
  connect()
})
