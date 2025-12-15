const winston = require('winston');
require('winston-daily-rotate-file');

const transport = new winston.transports.DailyRotateFile({
    filename: 'logs/application-%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d'
});

const accessTransport = new winston.transports.DailyRotateFile({
    filename: 'logs/access-%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d'
});

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.errors({ stack: true }),
        winston.format.json()
    ),
    transports: [
        transport,
        new winston.transports.Console({
            format: winston.format.simple()
        })
    ]
});

const accessLogger = winston.createLogger({
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(({ timestamp, message }) => {
            return `${timestamp} ${message}`;
        })
    ),
    transports: [accessTransport]
});

logger.stream = {
    write: (message) => {
        accessLogger.info(message.trim());
    }
};

module.exports = logger;