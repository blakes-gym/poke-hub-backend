const express = require("express")
const router = express.Router()
const { Pokemon, Wishlist } = require("../db/models")

//retrieve all pokemon from the wishlist

router.get("/", (req, res) => {
  Wishlist.findAll({
    include: [
      {
        model: Pokemon,
        as: "wlPoke"
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

//delete a pokemon from the wishlist

router.delete("/:id", (req, res) => {
  Wishlist.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(data => res.status(200).end("DELETED"))
    .catch(err => res.status(500).send(err))
})

//update a pokemon on the wishlist

router.put("/", (req, res) => {
  Wishlist.update(
    { ...req.body },
    {
      where: {
        id: req.body.id
      }
    }
  )
    .then(data => res.status(200).end("UPDATED"))
    .catch(err => res.status(500).send(err))
})

module.exports = router
