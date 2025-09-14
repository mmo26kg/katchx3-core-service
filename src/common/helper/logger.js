import { createLogger, format, transports } from 'winston';
import chalk from 'chalk';
import e from 'express';

class Logger {
    constructor() {
        this.levels = {
            fatal: 0,
            error: 1,
            warn: 2,
            info: 3,
            executeAPI: 4,
            runService: 5,
            returnAPI: 6,
            debug: 7,
        };
        this.colors = {
            fatal: chalk.red.bold.bgWhite,
            error: chalk.red,
            warn: chalk.yellow,
            info: chalk.cyan,
            executeAPI: chalk.blue,
            runService: chalk.magenta,
            returnAPI: chalk.green,
            debug: chalk.gray,
        };

        this.icons = {
            fatal: '☠️',
            error: '❌',
            warn: '⚠️',
            info: 'ℹ️',
            executeAPI: '🛜',
            runService: '🛠️',
            returnAPI: '↩️',
            debug: '🔍',
        };

        const envLevel = process.env.LOG_LEVEL || (isProd ? 'info' : 'debug');
        this.currentLevel = this.levels[envLevel] !== undefined ? this.levels[envLevel] : 7;

        this.stream = {
            write: (msg) => this.returnAPI(msg.trim()),
        };
    }
    log(level, message, meta) {
        const levelPriority = this.levels[level];
        if (levelPriority === undefined || levelPriority > this.currentLevel) {
            return;
        }

        const color = this.colors[level] || ((text) => text);
        const icon = this.icons[level] || '';
        const timestamp = chalk.gray(new Date().toISOString());
        const levelStr = color(level.toUpperCase());
        let msg = message;

        const metaStr =
            meta && Object.keys(meta).length > 0 ? chalk.dim(JSON.stringify(meta, null, 0)) : '';

        const logLine = `${icon}  ${timestamp} • ${levelStr} • ${msg} ${metaStr}`;

        console.log(logLine);
    }
    fatal(message, meta) {
        this.log('fatal', message, meta);
    }
    error(message, meta) {
        this.log('error', message, meta);
    }
    warn(message, meta) {
        this.log('warn', message, meta);
    }
    info(message, meta) {
        this.log('info', message, meta);
    }
    debug(message, meta) {
        this.log('debug', message, meta);
    }
    executeAPI(message, meta) {
        this.log('executeAPI', message, meta);
    }
    runService(message, meta) {
        this.log('runService', message, meta);
    }
    returnAPI(message, meta) {
        this.log('returnAPI', message, meta);
    }
    seperate() {
        console.log(chalk.gray(`${'*'.repeat(80)}`));
    }
}

export default Logger;
