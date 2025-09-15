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
            processing: 4,
            success: 5,
            executeAPI: 6,
            runService: 7,
            returnAPI: 8,
            debug: 9,
        };
        this.colors = {
            fatal: chalk.red.bold.bgWhite,
            error: chalk.red,
            warn: chalk.yellow,
            info: chalk.cyan,
            success: chalk.green,
            processing: chalk.blue,
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
            success: '✅',
            processing: '⏳',
            executeAPI: '🛜',
            runService: '🛠️',
            returnAPI: '↩️',
            debug: '🔍',
        };

        const envLevel = process.env.LOG_LEVEL || (isProd ? 'info' : 'debug');
        this.currentLevel = this.levels[envLevel] !== undefined ? this.levels[envLevel] : 9;

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
    success(message, meta) {
        this.log('success', message, meta);
    }
    processing(message, meta) {
        this.log('processing', message, meta);
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
