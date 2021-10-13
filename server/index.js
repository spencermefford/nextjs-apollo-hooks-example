const { ApolloServer, gql } = require('apollo-server');
const isEmpty = require('lodash/isEmpty');
const ProductsAPI = require('./ProductsAPI');
const TasksAPI = require('./TasksAPI');

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Task {
    id: ID!
    title: String
    completed: Boolean
  }

  type Product {
    id: ID!
    name: String
    price: Float
  }

  type MutationPayload {
    success: Boolean
  }

  type Query {
    tasks: [Task]!
    task(id: ID!): Task
    products: [Product]!
  }

  type Mutation {
    createTask(title: String!): Task!
    renameTask(id: ID!, title: String!): Task!
    completeTask(id: ID!, completed: Boolean!): Task!
    deleteTask(id: ID!): MutationPayload!
  }
`;

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    tasks: async (_source, _args, { dataSources }) => dataSources.tasksAPI.getTasks(),
    task: async (_source, { id }, { dataSources }) => dataSources.tasksAPI.getTask(id),
    products: async (_source, _args, { dataSources }) => dataSources.productsAPI.getProducts(),
  },
  Mutation: {
    createTask: async (_source, { title }, { dataSources }) => dataSources.tasksAPI.createTask(title),
    renameTask: async (_source, { id, title }, { dataSources }) => dataSources.tasksAPI.updateTask(id, { title }),
    completeTask: async (_source, { id, completed }, { dataSources }) => dataSources.tasksAPI.updateTask(id, { completed }),
    deleteTask: async (_source, { id }, { dataSources }) => {
      const resp = await dataSources.tasksAPI.deleteTask(id);
      return { success: isEmpty(resp) };
    },
  },
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    tasksAPI: new TasksAPI(),
    productsAPI: new ProductsAPI(),
  }),
});

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
