var express = require('express')
var Usuario = require('../models/usuario')
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken')

var middlewareAut = require('../middlewares/autenticacion')

var app = express();

//================================================
// Obtener todos los usuarios
//================================================

app.get('/', (req, res, next)=> {
    Usuario.find({}, 'nombre email imagen role')
    .exec( 
        (err, usuarios) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'error cargando usuarios',
                errors: err
            })
        }
        res.status(200).json({
            ok: true,
            usuarios: usuarios

        })
    })
})




//================================================
// Crear nuevo usuario
//================================================
app.post('/', middlewareAut.verificaToken,(req ,res) => {
    var body = req.body

    var usuario = new Usuario( {
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role,
        imagen: body.imagen
    })

    usuario.save(( error, usuarioGuardado ) => {
        if (error) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al crear usuario',
                errors: error
            })
        }
 
        res.status(201).json({
            ok: true,
            body: usuarioGuardado,
            usuarioToken: req.usuario
    
        })
        
    })
})

//================================================
// Actualizar nuevo usuario
//================================================

app.put('/:id', middlewareAut.verificaToken, (req, res, next) => {

    var id = req.params.id
    var body = req.body

    Usuario.findById( id , ( error, usuario ) =>{
        if (error) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar usuario',
                errors: error
            })
        }

        if (!usuario) {
            return res.status(404).json({
                ok: false,
                mensaje: 'El usuario no existe',
                errors: {messaje: 'El usuario no existe'}
            })
        }

        usuario.nombre = body.nombre
        usuario.email = body.email
        usuario.role = body.role

        usuario.save((error, usuarioGuardado) => {
            if (error) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al actualizar usuario',
                    errors: error
                })
            }
            usuarioGuardado.password = '..'
            res.status(200).json({
                ok: true,
                body: usuarioGuardado
        
            })
        })
    })
})

//================================================
// Borrar un usuaior
//================================================
app.delete('/:id', middlewareAut.verificaToken, (req, res, next) => {
    var id = req.params.id

    Usuario.findByIdAndRemove(id, (error, usuarioBorrado) => {
        if (error) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al Borrar usuario',
                errors: error
            })
        }

        if (!usuarioBorrado) {
            return res.status(400).json({
                ok: false,
                mensaje: 'No existe el usuario',
                errors: {messaje: 'No existe el usuario'}
            })
        }
 
        res.status(200).json({
            ok: true,
            body: usuarioBorrado
        })
    })
})

module.exports = app