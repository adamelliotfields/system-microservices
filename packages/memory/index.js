const server = require('./server');
const { doShutdown, getProduction } = require('./utils');

const production = getProduction();

const PORT = process.env.PORT || (production ? 80 : 8080);
const HOST = production ? '0.0.0.0' : 'localhost';

server.listen(PORT, HOST, () => {
  console.info(`Server listening at http://${HOST}:${PORT} ...`);
});

// Handle Ctrl-C
process.on('SIGINT', () => {
  server.close(doShutdown);
});

// Docker sends SIGTERM followed by SIGKILL after 10 seconds
process.on('SIGTERM', () => {
  server.close(doShutdown);
});
