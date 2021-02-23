/******************
* server/index.js
******************/

const express = require('express')
const logger = require('./config/logger')

const app = express()


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
