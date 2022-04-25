const expres = require('express');
const bill_client = require('./bill_client.router');

function routerApi(app) {
  const dynamic_routes = expres.Router();

  /* http://localhost:9000/api/v2 */
  app.use('/api/v2', dynamic_routes);

  /* http://localhost:9000/api/v2/clients */
  dynamic_routes.use('/clients', bill_client);
}

module.exports = routerApi;
