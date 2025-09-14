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
        registerAllModules(container);
        container.registerFactory('app', createApp);

        // Get dependencies
        const logger = container.get('logger');
        const sequelize = container.get('sequelize');
        const app = container.get('app');

        // Initialize DB
        await db.testConnection(sequelize);
        await db.syncModels(sequelize);

        // Start server
        const PORT = process.env.PORT || 3000;
        const BASE_URL = process.env.BASE_URL || 'http://localhost';
        app.listen(PORT, () => {
            logger.info(`Server is running on port ${PORT}`);
            logger.info(`Connect to ${BASE_URL}:${PORT}/health to check health`);
        });
    } catch (error) {
        const logger = container.get('logger');
        logger.error('Failed to start application', error);
        process.exit(1);
    }
}
main();
