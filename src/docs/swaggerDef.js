const { version } = require('../../package.json');
const config = require('../config/config');

const swaggerDef = {
  openapi: '3.0.0',
  info: {
    title: 'Polygon - Task : Documentation',
    description: 'All the points mentioned in task are done. After registering, to verify email please open your mail and click on the link. As of now, this verification can only be done on local. Before doing this, please run the server and test these apis.',
    version,
    license: {
      name: 'MIT',
      url: '<update_url_here>',
    },
  },
  servers: [
    {
      url: `http://localhost:${config.port}/v1`,
    },
  ],
};

module.exports = swaggerDef;
