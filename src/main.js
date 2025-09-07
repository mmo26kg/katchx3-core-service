// Env
import dotenv from 'dotenv';
dotenv.config();

// Imports
import app from './app.js';
import logger from './common/logger.js';
import db from './config/database.js';

// DB init (fire-and-forget, with logging)
async function initDB() {
  try {
    await db.testConnection();
    await db.syncModels();
  } catch (err) {
    logger.error('Database init failed', { error: err?.message });
  }
}
initDB();

// Server
const PORT = process.env.PORT || 3000;
const BASE_URL = process.env.BASE_URL || 'http://localhost';
app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
  logger.info(`Connect to ${BASE_URL}:${PORT}/health to check health`);
});
