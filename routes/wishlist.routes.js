const express = require('express')
const router = express.Router()
const { WishList } = require('../db/models')

router.get('/', (req, res) =>
  WishList.find(req.query)
    .populate('pokemon')
    .exec()
    .then(data => res.send(data))
    .catch(err => {
      console.error(err)
      res.status(500)
    })
)

module.exports = router
