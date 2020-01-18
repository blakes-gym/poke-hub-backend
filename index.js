require("dotenv").config()
const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
const models = require("./db/models")
const routes = require("./routes")
const seed = require("./db/seeders/seed")

const app = express()
const PORT = process.env.PORT || 4000
const ENV = process.env.NODE_ENV

app.use(cors())
app.use(bodyParser.json())

for (const route in routes) {
  const name = route.split(".")[0]
  app.use("/api/" + name, routes[route])
}

models.sequelize
  .sync({ force: ENV === "production" ? false : true })
  .then(async () => {
    await seed().catch(err => console.error(err))
    app.listen(PORT, () => {
      console.log(`\nlistening on ${PORT}`)
    })
  })
