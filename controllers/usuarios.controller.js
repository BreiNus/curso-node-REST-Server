import { response, request } from "express"  //esto es porque visualStudioCode, no tiene idea que tipo de dato es este, 
                                    // por enden no estan las funciones, por eso se hace es export y se iguala res = response
// esto por si queremos tener el typado de res y req es decir poner el . y que nos salgan las funciones


const usuariosGet = (req=request, res= response) => { 
    
    const {q, nombre, apikey} = req.query;
    res.json({

        msg: 'get API - controlador',
        q,
        nombre,
        apikey
    });
}

const usuariosPut = (req, res= response) => {

    const {id} = req.params
    res.status(400).json({

        msg: 'put API',
        id

    });
}

const usuariosPost = (req, res) => {

    const {nombre, edad} = req.body;     // el body viene desde la req (request) 
                               // como el body es un json osea un objeto se puede desestructurar     
    res.status(201).json({

        msg: 'post API',
        nombre, 
        edad

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


export {usuariosGet, usuariosPut, usuariosPost, usuariosPatch, usuariosDelete};