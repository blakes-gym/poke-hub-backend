require('dotenv').config()
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const routes = require('./routes')
const mongoose = require('mongoose')
const seed = require('./db/seed')

const app = express()
const PORT = process.env.PORT || 4000

app.use(cors())
app.use(bodyParser.json())

for (const route in routes) {
  const name = route.split('.')[0]
  app.use('/api/' + name, routes[route])
}

;(async function() {
  await mongoose.connect(process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  if (process.env.NODE_ENV !== 'production') {
    await seed()
  }
  console.log('\nconnected to db')
  app.listen(PORT, () => console.log(`\nlistening on ${PORT}`))
})()
