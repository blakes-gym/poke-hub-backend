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

  select(param) {
    const text = `select * from ${this.table} where ${Object.keys(param)[0]}=$1`
    const values = Object.values(param)
    return new Promise((resolve, reject) => {
      this.db
        .query(text, values)
        .then(data => resolve(data.rows))
        .catch(err => reject(err))
    })
  }

  insert(params) {
    const values = Object.values(params)
    const $values = values.map((__, i) => `$${i + 1}`).join(', ')
    const keys = Object.keys(params).join(', ')
    const text = `insert into ${this.table}(${keys}) values(${$values})`
    return new Promise((resolve, reject) => {
      this.db
        .query(text, values)
        .then(data => resolve(data))
        .catch(err => reject(err))
    })
  }
}
