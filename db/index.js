const sequelize = require('sequelize')

const db = new sequelize(
  process.env.DB,
  process.env.DBUSER,
  process.env.DBPASSWORD,
  {
    host: process.env.DBHOST,
    dialect: 'postgres'
  }
)

async function connect() {
  await db.sync({ force: true }).catch(err => console.error(err))
  console.log('\nconnected to db')
}

module.exports = { connect, db }
