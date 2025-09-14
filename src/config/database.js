import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();
function createSequelize() {
    return new Sequelize(
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
}

async function testConnection(sequelize) {
    try {
        await sequelize.authenticate();
        console.log('Database connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

async function syncModels(sequelize) {
    try {
        await sequelize.sync({ alter: process.env.DB_SYNC_ALTER === 'true' });
        console.log('All models were synchronized successfully.');
    } catch (error) {
        console.error('Error synchronizing models:', error);
    }
}

export default { createSequelize, testConnection, syncModels };
