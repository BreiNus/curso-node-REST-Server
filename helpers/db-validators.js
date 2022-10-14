const Role = require('../models/role');
const Usuario = require('../models/usuario');

const esRoleValido = async (role = '') => { //lo que hace el .custom() es basicamente crear un mensaje de error customizado validando si esta o no ese rol en la DB

    const existeRol = await Role.findOne({ role });
    if (!existeRol) {
        throw new Error(`El Rol: ${role}, no esta registrado en la DB`)
    }
}

const emailExiste = async (email = '') => {
    const existeEmail = await Usuario.findOne({ email }); //Esta instruccion va a buscar uno como lo dice y va a buscar un objeto que tenga el email igual 
    if (existeEmail) {                                     //al correo y como js es relevante poner que algo es igual a los mismo (email : email) ponemos email solo
        throw new Error(`Este email: ${email}, ya esta registado`)
        }
    }


module.exports = {
    esRoleValido,
    emailExiste
}