const express = require('express')
const router = express.Router()
const { Pokemon } = require('../db/models')
const { error } = require('./util')

router.get('/', (req, res) =>
  Pokemon.find(req.query)
    .then(data => res.send(data))
    .catch(err => error(err, res))
)

module.exports = router
