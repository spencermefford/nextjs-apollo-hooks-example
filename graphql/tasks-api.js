const { RESTDataSource } = require('apollo-datasource-rest');

class TasksAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'http://localhost:3001/';
  }

  async getTasks() {
    return this.get('tasks');
  }
}

module.exports = TasksAPI;