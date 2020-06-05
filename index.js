const express = require('express');
const app = express();

require('./startup/logging')();
require('./startup/routes')(app)
require('./startup/db')();
require('./startup/config')();
require('./startup/validation')();
require('./startup/prod')(app);

const server = require('./startup/server')(app);

module.exports = server;