const express = require('express')
const router = express.Router()
const { Pokemon } = require('../db/models')

router.get('/', (req, res) =>
  Pokemon.find(req.query)
    .then(data => res.send(data))
    .catch(err => {
      console.error(err)
      res.status(500)
    })
)

module.exports = router
