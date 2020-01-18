module.exports = {
  development: {
    username: process.env.DBUSER,
    password: process.env.DBPASSWORD,
    database: process.env.DB,
    host: process.env.DBHOST,
    dialect: 'postgres',
    operatorsAliases: 0,
    logging: 0
  },
  test: {
    username: 'root',
    password: null,
    database: 'database_test',
    host: '127.0.0.1',
    dialect: 'mysql',
    operatorsAliases: false
  },
  production: {
    username: process.env.DBUSER,
    password: process.env.DBPASSWORD,
    database: process.env.DB,
    host: process.env.DBHOST,
    dialect: 'postgres',
    operatorsAliases: 0,
    logging: 0
  }
}
