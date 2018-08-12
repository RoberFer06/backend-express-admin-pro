// Requires
var express = require('express')
var mongoose = require('mongoose')
var bodyParser = require('body-parser')

// Inicializar variables
var app = express()


//body parser
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


//import rutas
var appRoutes = require('./routes/app')
var appLogin = require('./routes/login')
var usuariosRoutes = require('./routes/usuario')

// Conexión a db
mongoose.connection.openUri('mongodb://localhost:27017/hospitalDB', (err, res) => {
    if (err) throw err

    console.log('mongodb online')
})

// rutas
app.use('/login',appLogin)
app.use('/usuario',usuariosRoutes)
app.use('/',appRoutes)



// Escuchar peticiones
app.listen(3000 , () => {
    console.log('express server puerto 3000 online')
})

