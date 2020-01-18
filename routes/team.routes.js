const express = require("express")
const router = express.Router()
const { Team } = require("../db/models")
const { Pokemon } = require("../db/models")
const { Op } = require("sequelize")
const sequelize = require("sequelize")

//get pokemon from a team

router.get("/", (req, res) => {
  Team.findAll({
    include: [
      { model: Pokemon, as: "p1" },
      { model: Pokemon, as: "p2" }
    ]
  })
    .then(data => res.send(data))
    .catch(err => console.error(err))
})
// SELECT * FROM "Pokemons" INNER JOIN "Teams" ON "Pokemons".id="Teams"."pokemon1"
//seed a simulated a pokemon team

router.get("/seed", (req, res) => {
  Team.create({
    name: "best",
    p1: 1
    // p2: 1,
    // p3: 1,
    // p4: 1,
    // p5: 1,
    // p6: 1
  })
    .then(data => res.send(data))
    .catch(err => res.status(500).send(err))
})

module.exports = router
