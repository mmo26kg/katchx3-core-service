// Imports
import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import logger from './common/logger.js';
import allModules from './modules/allModules.js';

// App
const app = express();

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const morganFormat = ':method :url :status :res[content-length] - :response-time ms';
app.use(morgan(morganFormat, { stream: logger.stream }));

// Register all modules (before 404)
Object.values(allModules).forEach((mod) => {
  if (mod.basePath && mod.router) {
    app.use(mod.basePath, mod.router);
    logger.info(`Module registered: ${mod.name}`);
  } else {
    logger.warn('Invalid module, missing basePath or router', { module: mod });
  }
});

// Routes
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

// 404 and error handlers
app.use((req, res) => res.status(404).send('Not Found'));

app.use((err, req, res, next) => {
  logger.error('Unhandled error in request', { error: err?.message });
  res.status(500).send('Internal Server Error');
});

export default app;
