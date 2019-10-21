const { ApolloServer, gql } = require('apollo-server-express');
const TasksAPI = require('./tasks-api');

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Task {
    id: ID!,
    title: String
  }

  type Query {
    tasks: [Task]!
  }
`;

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    tasks: async (_source, _args, { dataSources }) => dataSources.tasksAPI.getTasks(),
  },
};

const createApolloServer = () => new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    tasksAPI: new TasksAPI(),
  }),
});

module.exports = createApolloServer;