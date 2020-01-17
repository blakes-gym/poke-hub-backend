const express = require('express')
const router = express.Router()
const { Pokemon } = require('../db/models/Pokemon')
const { Team } = require('../db/models/Pokemon')
const { db } = require('../db/index')

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
  let attribute, newValue;
  let pokemonId = req.body.pokemonId;
  for (var key in req.body) {
    if (key !== 'pokemonId') {
      attribute = key;
      newValue = req.body[key];
    }
  }
  db.query(`UPDATE pokemons SET "${attribute}"='${newValue}' WHERE id=${pokemonId};`)
  .then(data => res.send(data))
  .catch(err => res.status(500).send(err))
})

//get pokemon from a team

router.get('/team/:id', (req, res) => {
    let teamId = req.params.id;
    db.query(`SELECT * FROM pokemons INNER JOIN teams ON ("pokemons"."id"="teams"."pokeId") WHERE "teams"."teamId"=${teamId};`)
    .then(data => res.send(data[0]))
    .catch(err => res.status(500).send(err))
})

//toggle pokemon's wishlist status

router.put('/wishlist', (req, res) => {
  let pokemonId = req.body.pokemonId;
  let newValue = req.body.boolean;
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

//seed a simulated a pokemon team

router.get('/teamSeedTest', (req, res) => {
  let miniSeed = [];
  for (let i = 0; i < 7; i++) {
    miniSeed.push( {
      teamId: 1,
      pokeId: (i + 1),
      name: "best"
    })
  }
  Team.bulkCreate(miniSeed)
    .then(data => res.send(data))
    .catch(err => res.status(500).send(err))
})


module.exports = router
