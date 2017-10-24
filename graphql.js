const express = require('express')
const graphqlHTTP = require('express-graphql')
const { buildSchema } = require('graphql')
const app = express()
const webtask = require('webtask-tools')
const bodyParser = require('body-parser')

const schema = buildSchema(`
type Query {
  hello: String
}
`)
const root = { hello: () => 'Hello world!' }

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.post('/', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: false
}))

app.get('/', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true
}))

module.exports = webtask.fromExpress(app)
