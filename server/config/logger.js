/******************
 * server/config/logger.js
 ******************/
const winston = require('winston')

const { createLogger , format , transports } = require('winston')
const { combine, timestamp , splat , printf , errors, json } = format;


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

module.exports = logger
