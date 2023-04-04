const log4js = require('./utils/log4js.config');
const io = require('socket.io')();
const http = require('http');

const port = process.env.PORT || 3000;

const logger = log4js.getLogger('app');

io.on('connection', (socket) => {
  const sessionId = socket.id;
  logger.addContext('sessionId', sessionId);
  logger.debug('New connection established');
  socket.on('disconnect', () => {
    logger.debug('Connection closed');
  });
});

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(`{"code":200, "data":"OK", "message":""}`));
});

server.listen(port, (err, result) => {
  logger.info('Server running at port: ' + port);
});

io.attach(server);

