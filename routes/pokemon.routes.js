const express = require('express')
const router = express.Router()
const { Pokemon } = require('../db/models')

//get all pokemon

router.get('/', (req, res) => {
  Pokemon.findAll({
    order: ['id']
  })
    .then(data => res.send(data))
    .catch(err => res.status(500).send(err))
})

//Edit a pokemon (moves 1-4, nature, item)

router.put('/', (req, res) => {
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
