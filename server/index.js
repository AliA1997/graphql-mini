const express = require('express')
const bodyParser = require('body-parser');
const graphqlHTTP = require('express-graphql');
const cors = require('cors')
const PORT = 3050

const app = express();
const schema = require('./graphql/schema');

app.use(bodyParser.json())
app.use(cors())

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}))

app.listen(PORT, () => console.log('Listening on Port: ' + PORT))