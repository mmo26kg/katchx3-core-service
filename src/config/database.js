import { Sequelize } from 'sequelize';
function createSequelize() {
    if (!process.env.DB_NAME || !process.env.DB_USER || !process.env.DB_PASSWORD) {
        throw new Error(
            `Database configuration environment variables are missing: DB_NAME=${process.env.DB_NAME ? 'OK' : 'Missing'}, DB_USER=${process.env.DB_USER ? 'OK' : 'Missing'}, DB_PASSWORD=${process.env.DB_PASSWORD ? 'OK' : 'Missing'}`
        );
    }
    try {
        const sequelize = new Sequelize(
            process.env.DB_NAME || '',
            process.env.DB_USER || '',
            process.env.DB_PASSWORD || '',
            {
                host: process.env.DB_HOST || 'localhost',
                port: parseInt(process.env.DB_PORT, 10) || 5432,
                dialect: process.env.DB_DIALECT || 'postgres',
                logging: process.env.DB_LOGGING === 'true' ? console.log : false,
                pool: {
                    max: parseInt(process.env.DB_POOL_MAX, 10) || 10,
                    min: parseInt(process.env.DB_POOL_MIN, 10) || 0,
                    acquire: parseInt(process.env.DB_POOL_ACQUIRE, 10) || 30000,
                    idle: parseInt(process.env.DB_POOL_IDLE, 10) || 10000,
                },
            }
        );
        return sequelize;
    } catch (error) {
        console.error('Error loading environment variables:', error);
        throw error;
    }
}

async function testConnection(sequelize, logger) {
    try {
        await sequelize.authenticate();
        logger.success('Database connection has been established successfully.');
    } catch (error) {
        logger.error('Unable to connect to the database:', error);
    }
}

async function syncModels(sequelize, logger) {
    try {
        await sequelize.sync({ alter: process.env.DB_SYNC_ALTER === 'true' });
        logger.success('All models were synchronized successfully.');
    } catch (error) {
        logger.error('Error synchronizing models:', error);
    }
}

export default { createSequelize, testConnection, syncModels };
