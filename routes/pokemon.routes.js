const express = require("express")
const router = express.Router()
const { Pokemon } = require("../db/models")

router.get("/", (req, res) => {
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
})

router.get("/all", (req, res) => {
  Pokemon.findAll({
    order: ["id"]
  })
    .then(data => res.send(data))
    .catch(err => res.status(500).send(err))
})

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
