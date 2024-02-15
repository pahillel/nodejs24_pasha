const http = require('http');
const logger = require('./utils/logger')('server');

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || 'localhost';

const server = http
  .createServer()
  .on('listening', () => {
    logger.info(`App is running at ${HOST}:${PORT}`);
  })
  .on('request', (req, res) => {
    if (req.method === 'GET' && req.url === '/healthcheck') {
      res.statusCode = 200;
      logger.info(`${req.method} ${req.url} ${res.statusCode}`);

      res.end('healthcheck passed');
    } else {
      res.statusCode = 404;
      logger.warn(`${req.method} ${req.url} ${res.statusCode}`);

      res.end('404 Not Found');
    }
  })
  .on('error', (error) => {
    logger.error('Launch error!', error);
    process.exit(0);
  });

server.listen(PORT, HOST);
