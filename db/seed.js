const db = require('./index')
const Models = require('./models')
const fs = require('fs')
const _ = require('lodash')

const { Pokemon } = Models

module.exports = async function() {
  for (const key in Models) {
    if (key !== 'Model') {
      await db.query(`drop table if exists ${key} cascade`)
      if (Models[key].columns) {
        const model = Models[key]
        const columns = Object.entries(model.columns)
        const mapped = columns
          .map(([key, value]) => {
            let string = key + ' '
            if (model.primaryKey === key) string += value + ' primary key'
            else if (_.has(model, ['foreignKeys', key]))
              string += value + ' references ' + model.foreignKeys[key]
            else string += value
            return string
          })
          .join(',\n')
        let query = `create table ${key} (\n${mapped}\n)`
        await db.query(query)
      }
    }
  }

  const data = fs.readFileSync('db/data/pokemon.csv', 'utf8')
  const lines = data.split('\n')
  const parsed = []
  for (const pokemon of lines) {
    const values = pokemon.split(',')
    const obj = {
      name: values[1],
      image: values[2],
      icon: values[3],
      type1: values[4],
      type2: values[5] || undefined,
      hp: values[6],
      atk: values[7],
      def: values[8],
      spAtk: values[9],
      spDef: values[10],
      speed: values[11]
    }
    parsed.push(obj)
  }

  for (pokemon of parsed) {
    await Pokemon.insert(pokemon)
  }
}
