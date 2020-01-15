const sequelize = require('sequelize')

const db = new sequelize(
  process.env.DB,
  process.env.DBUSER,
  process.env.DBPASSWORD,
  {
    host: process.env.DBHOST,
    dialect: 'postgres',
    logging: false
  }
)

async function connect() {
  require('./models')
  const force = true
  await db.sync({ force }).catch(err => console.error(err))

  if (force) {
    const seed = require('./seed')
    await seed().catch(err => console.error(err))
  }

  console.log('\nconnected to db')
}

module.exports = { db, connect }
