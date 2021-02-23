/******************
* server/index.js
******************/

const express = require('express')

const port = 8080

const app = express()

app.get('/', ( req, res )=>{
    res.send('hola mundo')
})

app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto:${port}!!`)
})
