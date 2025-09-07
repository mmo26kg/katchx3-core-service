// Create Express app
import express from 'express';
import logger from './common/logger.js';

const app = express();
// Middleware for parsing JSON requests
app.use(express.json());

import morgan from 'morgan';
const morganFormat = ':method :url :status :res[content-length] - :response-time ms';
app.use(morgan(morganFormat, { stream: logger.stream }));

// Simple route for health check
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});
