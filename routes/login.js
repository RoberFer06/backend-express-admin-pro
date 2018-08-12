var express = require('express')
var Usuario = require('../models/usuario')
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken')
var SEED = require('../config/config').SEED
var app = express();

app.post('/', (req, res) => {

    var body = req.body

    Usuario.findOne({email: body.email}, (error, usuarioDB) => { 

        if (error) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar usuarios',
                errors: error
            })
        }

        if(!usuarioDB) {
            return res.status(400).json({
                ok: false,
                mensaje: 'credenciales incorrectas - email',
                errors: { messaje: 'credenciales incorrectas'}
            })
        }

        if ( !bcrypt.compareSync(body.password, usuarioDB.password)) {
            return res.status(400).json({
                ok: false,
                mensaje: 'credenciales incorrectas - password',
                errors: { messaje: 'credenciales incorrectas'}
            })
        }

        //Crear Token
        var token = jwt.sign({ usuario: usuarioDB}, SEED, { expiresIn: 14400}) // 4 horas
        usuarioDB.password = ".."
        res.status(200).json({
            ok: true,
            mensaje: 'login correcto',
            token: token,
            usuarioDB: usuarioDB,
            id: usuarioDB._id
        })
    })
    
})


module.exports = app