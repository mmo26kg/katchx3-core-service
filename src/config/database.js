// Imports
import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';
import logger from '../common/logger.js';

// Env
dotenv.config();

// Helpers
const toInt = (v, d) => {
  const n = parseInt(v, 10);
  return Number.isFinite(n) ? n : d;
};

// Sequelize instance
const sequelize = new Sequelize(
  process.env.DB_NAME || '',
  process.env.DB_USER || '',
  process.env.DB_PASSWORD || '',
  {
    host: process.env.DB_HOST || 'localhost',
    port: toInt(process.env.DB_PORT, 5432),
    dialect: process.env.DB_DIALECT || 'postgres',
    logging: process.env.DB_LOGGING === 'true' ? (msg) => logger.debug(msg) : false,
    pool: {
      max: toInt(process.env.DB_POOL_MAX, 10),
      min: toInt(process.env.DB_POOL_MIN, 0),
      acquire: toInt(process.env.DB_POOL_ACQUIRE, 30000),
      idle: toInt(process.env.DB_POOL_IDLE, 10000),
    },
  }
);

// Test connection
async function testConnection() {
  try {
    await sequelize.authenticate();
    logger.info('Database connection has been established successfully.');
  } catch (err) {
    logger.error('Unable to connect to the database', { error: err?.message });
  }
}

// Sync models (consider migrations in production)
async function syncModels() {
  try {
    await sequelize.sync({ alter: true });
    logger.info('All models were synchronized successfully.');
  } catch (err) {
    logger.error('Error while synchronizing the models', { error: err?.message });
  }
}

// Exports
export { sequelize, testConnection, syncModels };
export default { sequelize, testConnection, syncModels };
