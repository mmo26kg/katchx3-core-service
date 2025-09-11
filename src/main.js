// Env
import dotenv from 'dotenv';
dotenv.config();

// Imports
import logger from './common/logger.js';
import db from './config/database.js';
import app from './app.js';
import DIContainer from './common/helper/di-container.js';
import UserModule from './modules/user/user.module.js';
import { notFound, serverError } from './common/helper/api.response.js';

// import allModules from './modules/allModules.js';

// Create instance of Sequelize and register in DI
const sequelize = db.createSequelize();
DIContainer.register('sequelize', () => sequelize);

// Load modules that may depend on DI-registered sequelize
const userRouter = UserModule.getController();
app.use(UserModule.getBasePath(), userRouter);

// Test and sync DB (sync after modules define models)
await db.testConnection(sequelize);
await db.syncModels(sequelize);

// 404 and error handlers (register last)
app.use((req, res) => notFound('Not Found').send(res));
app.use((err, req, res, next) => {
  logger.error('Unhandled error in request', { error: err?.message });
  serverError('Internal Server Error', err).send(res);
});

// Server
const PORT = process.env.PORT || 3000;
const BASE_URL = process.env.BASE_URL || 'http://localhost';
app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
  logger.info(`Connect to ${BASE_URL}:${PORT}/health to check health`);
});
