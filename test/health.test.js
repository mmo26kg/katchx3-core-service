// Minimal health check: start app on an ephemeral port and call /health
import app from '../src/app.js';
import logger from '../src/common/logger.js';

const server = app.listen(0);
await new Promise((resolve) => server.once('listening', resolve));

const { port } = server.address();
const res = await fetch(`http://127.0.0.1:${port}/health`);
const body = await res.text();

if (res.status === 200 && body.trim() === 'OK') {
  logger.info('Health check: PASS');
} else {
  logger.error(`Health check: FAIL (status=${res.status}, body='${body.trim()}')`);
  process.exitCode = 1;
}

server.close();
