const winston = require('winston');
const express = require('express');
const app = express();

require('./startup/logging')();
require('./startup/routes')(app)
require('./startup/db')();
require('./startup/config')();
require('./startup/validation')();

app.listen(2000, () => winston.info('Listening on port 2000'));