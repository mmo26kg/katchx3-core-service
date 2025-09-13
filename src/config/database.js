// // Imports
// import dotenv from 'dotenv';
// import { Sequelize } from 'sequelize';
// import logger from '../common/logger.js';

// // Env
// dotenv.config();

// // Helpers
// const toInt = (v, d) => {
//     const n = parseInt(v, 10);
//     return Number.isFinite(n) ? n : d;
// };

// // Build Sequelize options and factory (no direct instance here)
// function getSequelizeOptions() {
//     return {
//         host: process.env.DB_HOST || 'localhost',
//         port: toInt(process.env.DB_PORT, 5432),
//         dialect: process.env.DB_DIALECT || 'postgres',
//         logging: process.env.DB_LOGGING === 'true' ? (msg) => logger.debug(msg) : false,
//         pool: {
//             max: toInt(process.env.DB_POOL_MAX, 10),
//             min: toInt(process.env.DB_POOL_MIN, 0),
//             acquire: toInt(process.env.DB_POOL_ACQUIRE, 30000),
//             idle: toInt(process.env.DB_POOL_IDLE, 10000),
//         },
//     };
// }

// function createSequelize() {
//     return new Sequelize(
//         process.env.DB_NAME || '',
//         process.env.DB_USER || '',
//         process.env.DB_PASSWORD || '',
//         getSequelizeOptions()
//     );
// }

// // Test connection
// async function testConnection(sequelize) {
//     try {
//         await sequelize.authenticate();
//         logger.info('Database connection has been established successfully.');
//     } catch (err) {
//         logger.error('Unable to connect to the database', { error: err?.message });
//     }
// }

// // Sync models (consider migrations in production)
// async function syncModels(sequelize) {
//     try {
//         await sequelize.sync({ alter: true });
//         logger.info('All models were synchronized successfully.');
//     } catch (err) {
//         logger.error('Error while synchronizing the models', { error: err?.message });
//     }
// }

// // Exports
// export default { createSequelize, testConnection, syncModels };

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
