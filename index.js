/******************
 * index.js
 ******************/
// Librerias
const http = require ('http')


//Ficheros del Proyecto
const app = require('./server')
const config = require('./server/config')

// Utilizamos port de server.config
const { port } = config.server

const server = http.createServer(app)

server.listen(port,() =>{
    console.log(`Servidor corriendo en el puerto:${port}`)
})
