import express from 'express';
import container from './common/helper/di-container.js';
import morgan from 'morgan';
import e from 'express';

export function createApp() {
    const app = express();

    // Get logger from DI if available; otherwise fallback to console
    let logger;
    try {
        logger = container.get('logger');
    } catch {
        const fallback = {
            info: (...args) => console.log('[info]', ...args),
            warn: (...args) => console.warn('[warn]', ...args),
            error: (...args) => console.error('[error]', ...args),
            debug: (...args) => console.debug('[debug]', ...args),
        };
        fallback.stream = { write: (msg) => fallback.info(msg.trim()) };
        logger = fallback;
    }

    // Middlewares
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use((req, res, next) => {
        logger.info(`→ ${req.method} ${req.url} started`);
        next();
    });

    const morganFormat = ':method :url :status :res[content-length] - :response-time ms';
    app.use(
        morgan(morganFormat, {
            stream: logger.stream,
        })
    );

    // Basic health endpoint (no DB/DI required)
    app.get('/health', (_req, res) => {
        res.status(200).send('OK');
    });

    // Load modules if registered (skip silently if DI not ready)
    try {
        const allModules = container.get('allModules');
        allModules.forEach((module) => {
            logger.info(`Initializing module ${module.moduleConfig.singularizedName}`);
            module.initApp(app);
            logger.info(`-> Module ${module.moduleConfig.singularizedName} initialized`);
        });
    } catch (error) {
        logger.error('Failed to initialize modules', error);
    }

    return app;
}
export default createApp;
