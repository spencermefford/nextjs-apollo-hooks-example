const { RESTDataSource } = require('apollo-datasource-rest');

class ProductsAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'http://localhost:3001/';
  }

  async getProducts() {
    return this.get('products');
  }

  async getProduct(id) {
    return this.get(`products/${id}`);
  }
}

module.exports = ProductsAPI;
