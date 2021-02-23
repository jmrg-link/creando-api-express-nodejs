/******************
 * server/config/logger.js
 ******************/
const winston = require('winston')
const { createLogger , format , transports } = require('winston')
const { combine, errors, json } = format;

// Setup Logger

const logger = createLogger({
    format:
        winston.format.combine(
        winston.format.colorize({ all: true }),
        winston.format.simple()
    ),
    transports: [
        new transports.Console(),
        new winston.transports.File({
            filename: 'warn.log',
            level: 'warn'
        }),
        new winston.transports.File({
            filename: 'errors.log',
            level: 'error'
        })

    ]
})

module.exports = logger
