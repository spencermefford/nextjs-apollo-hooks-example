const { ApolloServer, gql } = require('apollo-server');
const { RESTDataSource } = require('apollo-datasource-rest');
const isEmpty = require('lodash/isEmpty');

class TasksAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'http://localhost:3001/';
  }

  async getTasks() {
    return this.get('tasks');
  }

  async getTask(id) {
    return this.get(`tasks/${id}`);
  }

  async createTask(title) {
    return this.post('tasks', { title });
  }

  async updateTask(id, task) {
    return this.patch(`tasks/${id}`, task);
  }

  async deleteTask(id) {
    return this.delete(`tasks/${id}`);
  }
}

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Task {
    id: ID!
    title: String
    completed: Boolean
  }

  type MutationPayload {
    success: Boolean
  }

  type Query {
    tasks: [Task]!
    task(id: ID!): Task
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
    tasks: async (_source, _args, { dataSources }) =>
      dataSources.tasksAPI.getTasks(),
    task: async (_source, { id }, { dataSources }) =>
      dataSources.tasksAPI.getTask(id),
  },
  Mutation: {
    createTask: async (_source, { title }, { dataSources }) =>
      dataSources.tasksAPI.createTask(title),
    renameTask: async (_source, { id, title }, { dataSources }) =>
      dataSources.tasksAPI.updateTask(id, { title }),
    completeTask: async (_source, { id, completed }, { dataSources }) =>
      dataSources.tasksAPI.updateTask(id, { completed }),
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
  }),
});

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});