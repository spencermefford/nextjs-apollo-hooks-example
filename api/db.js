const { v4: uuidv4 } = require('uuid');

module.exports = () => {
  const data = {
    tasks: [
      {
        id: uuidv4(),
        title: 'Buy groceries',
        completed: true,
      },
      {
        id: uuidv4(),
        title: 'Go to the bank',
        completed: false,
      },
      {
        id: uuidv4(),
        title: 'Wash the dog',
        completed: false,
      },
    ],
    products: [
      {
        id: uuidv4(),
        name: 'Vanilla Ice Cream',
        price: 4.99,
      },
      {
        id: uuidv4(),
        name: 'Chocolate Ice Cream',
        price: 6.99,
      },
      {
        id: uuidv4(),
        name: 'Strawberry Ice Cream',
        price: 5.99,
      },
    ],
  };

  return data;
};
