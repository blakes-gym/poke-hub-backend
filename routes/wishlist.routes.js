const express = require("express")
const router = express.Router()
const { Pokemon, Wishlist, Moves } = require("../db/models")

//retrieve all pokemon from the wishlist

router.get("/", (req, res) => {
  Wishlist.findAll({
    include: [
      {
        model: Pokemon,
        as: "wlPoke"
      },
      {
        model: Moves,
        as: "move1"
        // as: "move2",
        // as: "move3",
        // as: "move4"
      }
    ]
  })
    .then(data => res.send(data))
    .catch(err => res.status(500).send(err))
})

//toggle pokemon's wishlist status

router.post("/", (req, res) => {
  Wishlist.create({ ...req.body })
    .then(data => res.send(data))
    .catch(err => res.status(500).send(err))
})

module.exports = router
