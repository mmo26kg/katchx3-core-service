import express from 'express';
import container from './common/helper/di-container.js';
import morgan from 'morgan';

export function createApp() {
    const app = express();
    const logger = container.get('logger');
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

    // Load modules that may depend on DI-registered dependencies
    const userModule = container.get('userModule');
    userModule.initApp(app);

    return app;
}
export default createApp;
