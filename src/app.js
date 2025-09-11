// Imports
import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import logger from './common/logger.js';
import ApiResponse, { ok } from './common/helper/api.response.js';
// Note: modules are registered in main.js after DI and DB init

// App
const app = express();

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const morganFormat = ':method :url :status :res[content-length] - :response-time ms';
app.use(morgan(morganFormat, { stream: logger.stream }));

// Routes
app.get('/health', (req, res) => {
    ok('OK').send(res);
});

export default app;
