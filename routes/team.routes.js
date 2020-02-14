const express = require('express')
const router = express.Router()
const { Team } = require('../db/models')
const { Pokemon } = require('../db/models')

router.get('/', (req, res) => {
  Team.find(req.query)
    .populate('p1')
    .populate('p2')
    .populate('p3')
    .populate('p4')
    .populate('p5')
    .populate('p6')
    .exec()
    .then(data => res.send(data))
    .catch(err => {
      console.error(err)
      res.status(500)
    })
})

module.exports = router
