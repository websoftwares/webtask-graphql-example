"use latest"
const { graphql, buildSchema } = require('graphql');
const schema = buildSchema(`
type Query {
  hello: String
}
`);
const root = { hello: () => 'Hello world!' };

module.exports = function (context, cb) {
graphql(schema, context.body.data, root)
    .then(data => {
        cb(null,  {
        "statusCode": 200,
        "body": JSON.stringify(data.data)
      })
    })
    .catch(err => cb(err))
};
