const express = require('express')
const router = express.Router()
const { Team } = require('../db/models')
const sequelize = require('sequelize')

//get pokemon from a team

router.get('/', (req, res) => {
  let teamId = req.params.id
  sequelize
    .query(
      `SELECT * FROM pokemons INNER JOIN teams ON ("pokemons"."id"="teams"."pokeId") WHERE "teams"."teamId"=${teamId};`
    )
    .then(data => res.send(data[0]))
    .catch(err => res.status(500).send(err))
})

//seed a simulated a pokemon team

router.get('/teamSeedTest', (req, res) => {
  let miniSeed = []
  for (let i = 0; i < 7; i++) {
    miniSeed.push({
      teamId: 1,
      pokeId: i + 1,
      name: 'best'
    })
  }
  Team.bulkCreate(miniSeed)
    .then(data => res.send(data))
    .catch(err => res.status(500).send(err))
})

module.exports = router
