import logger from './common/logger.js';

// Create Express app
import express from 'express';
const app = express();

// Load environment variables from .env file
import dotenv from 'dotenv';
dotenv.config();

// Middleware for parsing JSON requests
app.use(express.json());
// Basic request logging using Morgan and Winston
import morgan from 'morgan';
const morganFormat = ':method :url :status :res[content-length] - :response-time ms';
app.use(morgan(morganFormat, { stream: logger.stream }));

// Simple route for health check
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

// Kết nối DB
import dbConfig from './config/database.js';
(async () => {
  await dbConfig.testConnection();
  await dbConfig.syncModels();
})();
// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
  logger.info(`Connect to ${process.env.BASE_URL}:${PORT}/health to check health`);
});

// File main làm các nhiệm vụ sau
// - Khởi tạo các dịch vụ cơ bản
// - Thiết lập kết nối DB
// - Khởi chạy server (Express, Fastify, ...)
// - Thiết lập các middleware, routes, controllers, ...
// - Xử lý lỗi 404, 500
// - Kết nối với các dịch vụ ngoài (Redis, RabbitMQ, ...)
// - Thiết lập việc giám sát (Prometheus, Grafana, ...)
// - Thiết lập việc ghi log (Winston, Bunyan, ...)
// - Thiết lập việc quản lý cấu hình (dotenv, config, ...)
// - Thiết lập việc kiểm tra chất lượng mã nguồn (ESLint, Prettier, ...)

// Tạo
