const { ApolloServer, gql } = require('apollo-server-express');
const { isEmpty } = require('lodash');
const TasksAPI = require('./tasks-api');

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Task {
    id: ID!
    title: String
  }

  type MutationPayload {
    success: Boolean
  }

  type Query {
    tasks: [Task]!
  }

  type Mutation {
    createTask(title: String!): Task!
    deleteTask(id: ID!): MutationPayload!
  }
`;

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    tasks: async (_source, _args, { dataSources }) =>
      dataSources.tasksAPI.getTasks(),
  },
  Mutation: {
    createTask: async (_source, _args, { dataSources }) =>
      dataSources.tasksAPI.createTask(_args.title),
    deleteTask: async (_source, _args, { dataSources }) => {
      const resp = await dataSources.tasksAPI.deleteTask(_args.id);
      return { success: isEmpty(resp) };
    },
  },
};

const createApolloServer = () =>
  new ApolloServer({
    typeDefs,
    resolvers,
    dataSources: () => ({
      tasksAPI: new TasksAPI(),
    }),
  });

module.exports = createApolloServer;
