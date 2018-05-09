const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const graphqlHTTP = require('express-graphql')
const PORT = 3050

const app = express()

app.use(bodyParser.json())
app.use(cors())
app.use('/graphql', graphqlHTTP({
  schema: undefined,
  graphiql: true
}))

app.listen(PORT, () => console.log('Listening on Port: ' + PORT))