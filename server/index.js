/******************
* server/index.js
******************/

// Librerias Instaladas
const express = require('express')
const requestId = require('express-request-id')();
const morgan = require('morgan')
const bodyParser = require('body-parser');

const logger = require('./config/logger')

const api =  require('./api/v1')

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
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// Setup router and routes
app.use('/api'    , api )
app.use('/api/v1' , api )



// ROUTE GET - INDEX
//app.get('/', ( req, res ,next)=>{
//   res.status(200).json({
//       msg:'Solicitud GET / '
//   })
//})



// No route found handler - No se ha encontrado ninguna ruta
app.use((req,res,next) => {
    next({
        message: 'La ruta solicitada no existe',
        statusCode: 404,
        level:'warn'
    })
})


// Error handler - Gestor de Errores
app.use((err, req, res, next) => {
    const { message, statusCode = 500, level = 'error' } = err;
    const log = `${logger.header(req)} ${statusCode} ${message}`

    logger[level](log)
    res.status( statusCode ).json({
        message,
        error:true,
        statusCode
    })
})

module.exports = app
