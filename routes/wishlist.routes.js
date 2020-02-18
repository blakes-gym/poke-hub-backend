const express = require('express')
const router = express.Router()
const { WishList } = require('../db/models')
const { error } = require('../util')

router.get('/', (req, res) =>
  WishList.find(req.query)
    .populate('pokemon')
    .exec()
    .then(data => res.send(data))
    .catch(err => error(err, res))
)

module.exports = router
