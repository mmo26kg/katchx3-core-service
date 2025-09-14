import container from './common/helper/di-container.js';
import Logger from './common/helper/logger.js';
import createApp from './app.js';
import db from './config/database.js';
import registerAllModules from './modules/allModules.js';

async function main() {
    try {
        // Register dependencies
        container.registerClass('logger', Logger);
        container.registerFactory('sequelize', db.createSequelize);
        container.registerFactory('allModules', registerAllModules);
        container.registerFactory('app', createApp);

        // Get dependencies
        const logger = container.get('logger');
        if (!logger || typeof logger.info !== 'function') {
            // Exit if logger is not properly initialized
            throw new Error('Logger instance is invalid (missing info method)');
        }

        const sequelize = container.get('sequelize');
        if (!sequelize || typeof sequelize.authenticate !== 'function') {
            throw new Error('Sequelize instance is invalid (missing authenticate method)');
        }

        const app = container.get('app');
        if (!app || typeof app.listen !== 'function') {
            throw new Error('App instance is invalid (missing listen method)');
        }

        // Initialize DB
        await db.testConnection(sequelize, logger);
        await db.syncModels(sequelize, logger);

        // Start server
        const PORT = process.env.PORT || 3000;
        const BASE_URL = process.env.BASE_URL || 'http://localhost';
        app.listen(PORT, () => {
            logger.info(`Server is running on port ${PORT}`);
            logger.info(`Connect to ${BASE_URL}:${PORT}/health to check health`);
        });
    } catch (error) {
        try {
            console.error('Failed to start application', {
                error: error.message,
                stack: error.stack,
                timestamp: new Date().toISOString(),
                nodeVersion: process.version,
                platform: process.platform,
                env: process.env.NODE_ENV || 'development',
                pid: process.pid,
            });
        } catch {
            console.error('Failed to start application', error);
        } finally {
            process.exit(1);
        }
    }
}
// Thêm vào cuối file, trước main()

// Global error handlers
process.on('unhandledRejection', (reason, promise) => {
    try {
        const logger = container.get('logger');
        logger.error('Unhandled Rejection', {
            reason: reason?.message || reason,
            stack: reason?.stack,
        });
    } catch {
        console.error('Unhandled Rejection:', reason);
    } finally {
        process.exit(1);
    }
});

process.on('uncaughtException', (error) => {
    try {
        const logger = container.get('logger');
        logger.error('Uncaught Exception', { error: error.message, stack: error.stack });
    } catch {
        console.error('Uncaught Exception:', error);
    } finally {
        process.exit(1);
    }
});

// Graceful shutdown
process.on('SIGTERM', () => {
    try {
        const logger = container.get('logger');
        logger.info('SIGTERM received, shutting down gracefully');
    } catch {
        console.log('SIGTERM received, shutting down gracefully');
    }
    process.exit(0);
});

process.on('SIGINT', () => {
    try {
        const logger = container.get('logger');
        logger.info('SIGINT received, shutting down gracefully');
    } catch {
        console.log('SIGINT received, shutting down gracefully');
    }
    process.exit(0);
});

main();
