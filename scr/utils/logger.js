'use strict';

const { createLogger, format, transports } = require('winston');

const { combine, timestamp, printf, colorize, errors } = format;

const logFormat = printf(({ level, message, timestamp: ts, stack }) => {
  return `${ts} [${level}] ${stack || message}`;
});

const logger = createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: combine(
    errors({ stack: true }),
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    logFormat
  ),
  transports: [
    new transports.Console({
      format: combine(
        colorize(),
        errors({ stack: true }),
        timestamp({ format: 'HH:mm:ss' }),
        logFormat
      )
    })
  ]
});

// In production, also log to a file if LOG_TO_FILE is set
if (process.env.LOG_TO_FILE === 'true') {
  logger.add(new transports.File({
    filename: 'logs/error.log',
    level: 'error'
  }));
  logger.add(new transports.File({
    filename: 'logs/combined.log'
  }));
}

module.exports = logger;
