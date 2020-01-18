require('dotenv').config()

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const graphql = require('./graphql')
const models = require('./db/models')
// const { connect } = require('./db')
// const routes = require('./routes')

const app = express()
const PORT = process.env.PORT || 4000

graphql.applyMiddleware({ app })
app.use(cors())
app.use(bodyParser.json())

// for (const route in routes) {
//   const name = route.split('.')[0]
//   app.use('/api/' + name, routes[route])
// }

models.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`\nlistening on ${PORT}`)
    // connect()
  })
})
