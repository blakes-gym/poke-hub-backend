const pool = require('../index')

module.exports = class Model {
  constructor() {
    this.db = pool
    this.table = this.constructor.name.toLowerCase()
  }

  selectAll() {
    return new Promise((resolve, reject) => {
      this.db
        .query(`select * from ${this.table}`)
        .then(data => resolve(data.rows))
        .catch(err => reject(err))
    })
  }
}
