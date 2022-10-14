const { response, request } = require('express');  //esto es porque visualStudioCode, no tiene idea que tipo de dato es este, 
                                    // por enden no estan las funciones, por eso se hace es export y se iguala res = response
// esto por si queremos tener el typado de res y req es decir poner el . y que nos salgan las funciones

const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');


const usuariosGet = (req=request, res= response) => { 
    
    const {q, nombre = 'No name', apikey, page = 1, limit} = req.query;

    res.json({
        msg: 'get API - controlador',
        q,
        nombre,
        apikey,
        page,
        limit
    });
}

const usuariosPut = async (req, res= response) => {

    const {id} = req.params
    const{password, google, email, ...resto} = req.body;

    //TODO  validad contra base de datos
    if (password){
        //Encriptar o hacer el Hash de la contraseña
        const salt = bcryptjs.genSaltSync(); //el salt es el numero de vueltas de complejidad que uno le quiere dar a ala
                                            //hora de incriptar la contraseña, por defaut esta en 10, y es lo recomendado       
        resto.password = bcryptjs.hashSync(password, salt); //el hash es para enciptarlo en una sola via
    }

    //esto es para actualizar el registro
    const updatedUser = await Usuario.findByIdAndUpdate(id, resto);// el findByIdAndUpdate() aparte de encontrar el id, lo actualiza y me lo almacena en el objeto, en este caso updateUser
                                                                   // ese objeto es el que devuelvo en la response     

    res.status(400).json({

        msg: 'put API - usuariosPut',
        updatedUser

    });
}

const usuariosPost = async(req, res = response) => {

    const {name, email, password, role} = req.body;     // el body viene desde la req (request) 
                               // como el body es un json osea un objeto se puede desestructurar     
    const usuario = new Usuario({name, email, password, role}); //crea el usuario con los datos que contiene el body

    //verificar si el correo existe
    //se movio a ../helpers/db-validators

    //Encriptar o hacer el Hash de la contraseña
    const salt = bcryptjs.genSaltSync(); //el salt es el numero de vueltas de complejidad que uno le quiere dar a ala
                                         //hora de incriptar la contraseña, por defaut esta en 10, y es lo recomendado       
    usuario.password = bcryptjs.hashSync(password, salt) //el hash es para enciptarlo en una sola via

    //Guardar modelo de usuario en la db
    await usuario.save();           


      res.status(201).json({
        msg: 'post API',
        usuario
    });
}

const usuariosPatch = (req, res) => {
    res.status(202).json({

        msg: 'patch API'

    })
}

const usuariosDelete = (req, res) => {
    res.json({

        msg: 'delete API'

    })
}


module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete,
}