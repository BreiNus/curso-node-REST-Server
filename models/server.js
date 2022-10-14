const express = require('express');
const cors = require('cors');

const {router} = require('../routes/usuarios.js');
const { dbConnection } = require('../database/config.db.js');

class Server {

    constructor() {
        this.app = express();//lo que hace esto es que cuando se le hace una nueva instancia a nuestro sv, va a crear la app de
                            // express aca, como una propiedad en la misma clase del servidor 
        this.port = process.env.PORT;                            
        this.usuariosPath = '/api/usuarios';  //Este es donde apunta el endpoint de usuarios

        //conectar a base de datos
        this.conectarDB();

        //Meddlewares  //estas sos funciones qie siempre van a ejecutarse cuando se lance nuestro servidor
        this.middlewares();

        //Rutas de mi aplicacion:
        this.routes();
    }

    async conectarDB(){
        await dbConnection();
    }


middlewares(){

    // CORS:
    this.app.use( cors() );

    // Lectura y parseo del body // middleware para captar el contenido del body de una peticion post put o delete
    this.app.use( express.json() );

    // Directorio publico: 
    this.app.use( express.static('public') );


}


    routes() {  //metodo routes, aca van a estar todas mis rutas creadas
        /*
        this.app.get('/api', (req, res) => {  //es this.app y no app solo, por aca no tengo acceso al app porque no existe, lo que si tengo acceso es al this.app
            res.json({
                
                msg:'get API'
        
            })
        })*/

        this.app.use( this.usuariosPath, require('../routes/usuarios'));// esto dice, estoy necesitanto usar lo que esta en la ruta router, en usuariosPatch (que seria el patch /api/usuarios)

    }


    listen(){ //arranca el server y nos dice en que puerto esta corriendo el mismo
        this.app.listen(this.port, ()=>{
            console.log(`Server corriendo en el puerto ${this.port}`)
        })
    
}

}


module.exports = Server;