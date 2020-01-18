const express = require('express')
const router = express.Router()
const { Team } = require('../db/models')
const { Pokemon } = require('../db/models')

router.get('/', (req, res) => {
  const query = req.query
  Team.findAll({
    where: {
      name: query.name
    },
    include: query.include && [
      { model: Pokemon, as: 'p1' },
      { model: Pokemon, as: 'p2' },
      { model: Pokemon, as: 'p3' },
      { model: Pokemon, as: 'p4' },
      { model: Pokemon, as: 'p5' },
      { model: Pokemon, as: 'p6' }
    ]
  })
    .then(data => res.send(data))
    .catch(err => console.error(err))
})

router.post('/', (req, res) => {
  Team.create({ ...req.body })
    .then(data => res.send(data))
    .catch(err => console.error(err))
})

module.exports = router
