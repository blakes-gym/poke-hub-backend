const express = require('express')
const router = express.Router()
const { Pokemon } = require('../db/models/Pokemon')
const { db } = require('../db/index')

//toggle pokemon's wishlist status

router.put('/wishlist', (req, res) => {
  let pokemonId = req.body.pokemonId
  let newValue = req.body.boolean
  db.query(`UPDATE pokemons SET "wishList"=${newValue} WHERE id=${pokemonId};`)
    .then(data => res.send(data))
    .catch(err => res.status(500).send(err))
})

//retrieve all pokemon from the wishlist

router.get('/wishlist', (req, res) => {
  db.query(`SELECT * from pokemons where "wishList"=true;`)
    .then(data => res.send(data[0]))
    .catch(err => res.status(500).send(err))
})

module.exports = router
