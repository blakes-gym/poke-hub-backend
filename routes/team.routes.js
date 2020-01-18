const express = require("express")
const router = express.Router()
const { Team } = require("../db/models")
const { Pokemon } = require("../db/models")
const { Op } = require("sequelize")
const sequelize = require("sequelize")

//get pokemon from a team

router.get("/", (req, res) => {
  let teamName = req.query.name
  Team.findAll({
    where: {
      name: teamName
    },
    include: [
      { model: Pokemon, as: "p1" },
      { model: Pokemon, as: "p2" },
      { model: Pokemon, as: "p3" },
      { model: Pokemon, as: "p4" },
      { model: Pokemon, as: "p5" },
      { model: Pokemon, as: "p6" }
    ]
  })
    .then(data => res.send(data))
    .catch(err => console.error(err))
})

router.post("/", (req, res) => {
  let { name, p1Id, p2Id, p3Id, p4Id, p5Id, p6Id } = req.body
  Team.create({
    name,
    p1Id,
    p2Id,
    p3Id,
    p4Id,
    p5Id,
    p6Id
  })
    .then(data => res.send(data))
    .catch(err => console.error(err))
})

module.exports = router
