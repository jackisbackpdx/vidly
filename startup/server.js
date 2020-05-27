const winston = require('winston');

module.exports = function(app) {
    const server = app.listen(2000, () => winston.info('Listening on port 2000'));
    return server;
}