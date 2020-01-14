require('dotenv').config()

const express = require('express')

const graphql = require('./graphql')

const app = express()
graphql.applyMiddleware({ app })

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${graphql.graphqlPath}`)
)

// const express = require('express')

// const schema = require('./graphql/schema')
// const { connect } = require('./db')

// const app = express()
// const PORT = process.env.PORT || 3000

// schema.applyMiddleware({ app })

// app.get('/', (req, res) => res.send('Hello World!'))

// app.listen(PORT, () => {
//   console.log(`\nlistening on ${PORT}`)
//   connect()
// })
