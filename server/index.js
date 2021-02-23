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
app.use((req,res,next)=>{
    const message = 'La  ruta no existe'
    const statusCode = 404
    logger.warn(message)
    res.status(statusCode).json({
        message
    })
})


// Error handler - No existe o 404
app.use((err, req, res, next) => {
    const { statusCode = 500 , message } = err
    logger.error(message)
    res.status( statusCode ).json({
        message
    })
})

module.exports = app
