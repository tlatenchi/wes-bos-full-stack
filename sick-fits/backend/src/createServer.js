const { GraphQLServer } = require('graphql-yoga');
const Mutation = require('./resolvers/Mutation');
const Query = require('./resolvers/Query');
const db = require('./db');

// You will need to link up the resolvers. There are 2 types of resolvers, Query which is when you get data and mutations which is when you push data.

// Create the GraphQL Yoga Server
function createServer() {
	return new GraphQLServer({
		typeDefs: 'src/schema.graphql',
		resolvers: {
			Mutation,
			Query
		},
		resolverValidationOptions: {
			requireResolversForResolveType: false
		},
		context: (req) => ({ ...req, db })
	});
}

module.exports = createServer;
