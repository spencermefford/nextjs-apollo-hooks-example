const express = require('express');
const next = require('next')
const createApolloServer = require('./graphql/createApolloServer');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const app = express();
  const server = createApolloServer();
  server.applyMiddleware({ app });

  app.get('*', (req, res) => handle(req, res));

  app.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
})