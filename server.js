const express = require('express');
const bodyParser = require('body-parser');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');
import typeDefs from './schema.js';
import resolvers from './resolvers';
import models from './src/models';
// Put together a schema
const schema = makeExecutableSchema({
	typeDefs,
	resolvers,
});
// Initialize the app
const app = express();
// The GraphQL endpoint
app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));
// GraphiQL, a visual editor for queries
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));
// sync() will create all table if they doesn't exist in database
models.sequelize.sync().then(() => {
	app.listen(8080);
	console.log('Go to http://0.0.0.0:8080/graphiql to run queries!');
});