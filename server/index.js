/******************
* server/index.js
******************/

const express = require('express')

const app = express()


// ROUTE GET - INDEX
app.get('/', ( req, res ,next)=>{
   res.status(200).json({
       msg:'Solicitud GET / '
   })
})

// Error handler - No existe o 404
app.use((err, req, res, next) => {
    const { statusCode = 500 , message } = err
    res.status( statusCode ).json({
        message,
    })
})

module.exports = app
