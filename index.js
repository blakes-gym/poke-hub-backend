require('dotenv').config()
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const routes = require('./routes')
const seed = require('./db/seed')
const db = require('./db')

const app = express()
const PORT = process.env.PORT || 4000

app.use(cors())
app.use(bodyParser.json())

for (const route in routes) {
  const name = route.split('.')[0]
  app.use('/api/' + name, routes[route])
}

;(async function() {
  if (process.env.NODE_ENV !== 'production') {
    await seed()
  }
  await db.connect()
  console.log('\nconnected to db')
  app.listen(PORT, () => {
    console.log(`\nlistening on ${PORT}`)
  })
})()
