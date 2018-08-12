var mongoose = require('mongoose')
var uniqueValidator = require('mongoose-unique-validator')

var Schame = mongoose.Schema;

var rolesValidos = {
    values: ['ADMIN_ROLE','USER_ROLE'],
    message: '{VALUE} no es un rol valido'
}


var usuarioSchame = new Schame({
    nombre: {type: String, required: [true,'El nombre es requerido']},
    email: {type: String, unique: true,  required: [true,'El correo es requerido']},
    password: {type: String, required: [true, 'el pass es requerido']},
    imagen: {type: String, required: false },
    role: {type: String, required: true, default: 'USER_ROLE' , enum: rolesValidos}
})

usuarioSchame.plugin(uniqueValidator , {message: '{PATH} debe ser unico'})


module.exports = mongoose.model('Usuarios', usuarioSchame);