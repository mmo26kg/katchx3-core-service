import { createLogger, format, transports } from 'winston';
import chalk from 'chalk';

const { combine, timestamp, printf, colorize, errors, json, splat } = format;

const isProd = process.env.NODE_ENV === 'production';
const level = process.env.LOG_LEVEL || (isProd ? 'info' : 'debug');

// Human-readable console format with chalk highlights (dev only)
const humanFormat = printf((info) => {
    const lvlRaw = info[Symbol.for('level')] || info.level; // original level name
    const { level: lvlColored, message, timestamp: ts, stack, ...meta } = info;

    const tsColored = chalk.gray(ts);
    let msg = stack || message;

    // Color message by level (level label is already colored by colorize())
    if (!stack) {
        switch (lvlRaw) {
            case 'error':
                msg = chalk.red(msg);
                break;
            case 'warn':
                msg = chalk.yellow(msg);
                break;
            case 'info':
                msg = chalk.cyan(msg);
                break;
            case 'debug':
            default:
                msg = chalk.dim(msg);
        }
    }

    const extra = Object.keys(meta).length ? ` ${chalk.gray(JSON.stringify(meta))}` : '';
    return `${tsColored} ${lvlColored}: ${msg}${extra}`;
});

class Logger {
    constructor() {
        this.logger = createLogger({
            level,
            transports: [
                new transports.Console({
                    level,
                    format: isProd
                        ? combine(timestamp(), errors({ stack: true }), splat(), json())
                        : combine(
                              colorize(),
                              timestamp(),
                              errors({ stack: true }),
                              splat(),
                              humanFormat
                          ),
                }),
            ],
        });
        this.stream = {
            write: (msg) => this.logger.info(msg.trim()),
        };
    }

    info(message, meta) {
        this.logger.info(message, meta);
    }

    warn(message, meta) {
        this.logger.warn(message, meta);
    }

    error(message, meta) {
        this.logger.error(message, meta);
    }

    debug(message, meta) {
        this.logger.debug(message, meta);
    }
}

export default Logger;
