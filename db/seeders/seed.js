const { Pokemon, Team, Wishlist, Moves } = require("../models")
const fs = require("fs")
const _ = require("lodash")
const dummyData = require("../data/dummyData")

const data = fs.readFileSync("db/data/pokemon.csv", "utf8")
const split = data.split("\n")
const parsed = []
for (const [i, pokemon] of split.entries()) {
  const split2 = pokemon.split(",")
  const obj = {
    id: split2[0],
    name: split2[1],
    sprite: split2[2],
    icon: split2[3],
    type1: split2[4],
    type2: split2[5] || undefined,
    hp: split2[6],
    atk: split2[7],
    def: split2[8],
    spatk: split2[9],
    spdef: split2[10],
    speed: split2[11]
  }
  parsed.push(obj)
}

module.exports = () =>
  new Promise((resolve, reject) => {
    Pokemon.bulkCreate(parsed)
      .then(data =>
        Team.create({
          name: "best",
          p1Id: 1,
          p2Id: 2,
          p3Id: 3,
          p4Id: 4,
          p5Id: 5,
          p6Id: 6
        })
      )
      .then(data => {
        let wlSeed = []
        for (let i = 1; i < 5; i++) {
          wlSeed.push({
            item: "rare candy",
            wlPokeId: i,
            nature: "shy UWU",
            caught: true,
            move1Id: 4
            // m2Id: 2,
            // m3Id: 3,
            // m4Id: 4
          })
        }
        Wishlist.bulkCreate(wlSeed)
      })
      .then(data => {
        let moveSeed = []
        dummyData.forEach(pokemon => {
          for (let i = 0; i < pokemon.Moves.length; i++) {
            moveSeed.push({
              moveName: pokemon.Moves[i].Move,
              power: pokemon.Moves[i].Power,
              type: pokemon.Moves[i].Type
            })
          }
        })
        Moves.bulkCreate(moveSeed)
      })
      .then(data => resolve(data))
      .catch(err => reject(err))
  })
