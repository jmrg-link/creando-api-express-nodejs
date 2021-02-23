/******************
* server/index.js
******************/
// Librerias Instaladas
const express = require('express')
const requestId = require('express-request-id')();
const morgan = require('morgan')

const logger = require('./config/logger')

// Iniciamos app
const app = express()

// Setup middleware
app.use(requestId)
app.use(logger.requests);
app.use(morgan
    ('combined',
        {
            stream: { write: ( message ) => logger.info( message ) }
        }
    )
)

// ROUTE GET - INDEX
app.get('/', ( req, res ,next)=>{
   res.status(200).json({
       msg:'Solicitud GET / '
   })
})

// No route found handler
app.use((req,res,next) => {
    next({
        message: 'La ruta solicitada no existe',
        statusCode: 404,
        level:'warn'
    })
})


// Error handler - No existe o 404
app.use((err, req, res, next) => {
    const { message, statusCode = 500, level = 'error' } = err;
    const log = `${logger.header(req)} ${statusCode} ${message}`

    logger[level](log)
    res.status( statusCode ).json({
        message
    })
})

module.exports = app
