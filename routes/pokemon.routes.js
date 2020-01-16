const express = require('express')
const router = express.Router()
const { Pokemon } = require('../db/models')

router.get('/', (req, res) => {
  Pokemon.findAll({})
    .then(data => res.send(data))
    .catch(err => res.status(500).send(err))
})

module.exports = router
