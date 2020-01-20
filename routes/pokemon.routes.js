const express = require("express")
const router = express.Router()
const { Pokemon } = require("../db/models")
const { Op } = require("sequelize")

//find pokemon by ID or type

router.get("/", (req, res) => {
  if (req.query.id) {
    Pokemon.findAll({
      where: {
        id: req.query.id
      }
    })
      .then(data => res.send(data))
      .catch(err => {
        console.error(err)
        res.status(500).send(err)
      })
  }
  if (req.query.type) {
    Pokemon.findAll({
      where: {
        [Op.or]: [
          {
            type1: req.query.type
          },
          {
            type2: req.query.type
          }
        ]
      }
    })
      .then(data => res.send(data))
      .catch(err => {
        console.error(err)
        res.status(500).send(err)
      })
  }
})

//find all pkemon

router.get("/all", (req, res) => {
  Pokemon.findAll({
    order: ["id"]
  })
    .then(data => res.send(data))
    .catch(err => res.status(500).send(err))
})

//update pokemon

router.put("/", (req, res) => {
  const body = req.body
  Pokemon.update(body, {
    where: {
      id: body.id
    }
  })
    .then(data => res.send(data))
    .catch(err => res.status(500).send(err))
})

module.exports = router
