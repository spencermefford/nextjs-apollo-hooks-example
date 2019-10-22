const { RESTDataSource } = require('apollo-datasource-rest');

class TasksAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'http://localhost:3001/';
  }

  async getTasks() {
    return this.get('tasks');
  }

  async createTask(title) {
    return this.post('tasks', { title });
  }
}

module.exports = TasksAPI;
