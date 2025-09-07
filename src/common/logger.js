import { createLogger, format, transports } from 'winston';

const { combine, timestamp, printf, colorize, errors, json, splat } = format;

const isProd = process.env.NODE_ENV === 'production';
const level = process.env.LOG_LEVEL || (isProd ? 'info' : 'debug');

// Human-readable console format
const humanFormat = printf(({ level, message, timestamp, stack, ...meta }) => {
  const base = `${timestamp} ${level}: ${stack || message}`;
  const extra = Object.keys(meta).length ? ` ${JSON.stringify(meta)}` : '';
  return base + extra;
});

const logger = createLogger({
  level,
  transports: [
    new transports.Console({
      level,
      format: isProd
        ? combine(timestamp(), errors({ stack: true }), splat(), json())
        : combine(colorize(), timestamp(), errors({ stack: true }), splat(), humanFormat),
    }),
  ],
});

// For morgan integration
logger.stream = {
  write: (msg) => logger.info(msg.trim()),
};

export default logger;
