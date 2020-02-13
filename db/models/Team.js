const Model = require('./Model')
const { INT, SERIAL, STRING } = require('../constants/types')

class Team extends Model {
  constructor() {
    super()
    this.columns = {
      id: SERIAL,
      name: STRING,
      p1: INT,
      p2: INT,
      p3: INT,
      p4: INT,
      p5: INT,
      p6: INT
    }

    this.foreignKeys = {
      p1: 'pokemon',
      p2: 'pokemon',
      p3: 'pokemon',
      p4: 'pokemon',
      p5: 'pokemon',
      p6: 'pokemon'
    }
  }
}

const team = new Team()

module.exports = team
