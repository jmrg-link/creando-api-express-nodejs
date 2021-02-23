/******************
 * server/config/logger.js
 ******************/
const winston = require('winston')
const morgan = require('morgan');
const { createLogger , format , transports } = require('winston')
// const { combine, timestamp , splat , printf , errors, json } = format;
const stripFinalNewline = require('strip-final-newline');


// Setup Logger

const logger = createLogger({
    format:
        winston.format.combine(
        winston.format.colorize({ all: true }),
        winston.format.simple()
    ),
    transports: [
        new transports.Console({
            format:format.combine()
        }),
        new winston.transports.File({
            filename: 'logs/warn.log',
            level: 'warn',

        }),
        new winston.transports.File({
            filename: 'logs/error.log',
            level: 'error',
        }),
        new winston.transports.File({
            filename: 'logs/info.log',
            level: 'info',
        }),
    ]
})

// Setup requests logger

morgan.token('id', req => req.id)
const requestFormat = ':remote-addr [:date[iso]] :id ":method :url" :status';
const requests = morgan(requestFormat, {
    stream: {
        write: (message) => {
            // Remover saltos de linea
            const log = stripFinalNewline(message);
            return logger.info(log) || logger.warn(log) || logger.error(log)
        }
    }
})

// Attach to logger object
logger.requests = requests

module.exports = logger
