// Requires
var express = require('express')
var mongoose = require('mongoose')

// Inicializar variables
var app = express()

// Conexión a db
mongoose.connection.openUri('mongodb://localhost:27017/hospitalDB', (err, res) => {
    if (err) throw err

    console.log('mongodb online')
})

// rutas
app.get('/', (req, res, next)=> {
    res.status(200).json({
        ok: true,
        mensaje: 'Peticion realizada correctamente'
    })
})

// Escuchar peticiones
app.listen(3000 , () => {
    console.log('express server puerto 3000 online')
})

