const { Schema, model } = require('mongoose');



const UsuarioSchema = Schema({
    name: {               //todo lo de la llave es decir como quiero que luzca el nombre
        type: String,
        required: [true, 'El nombre es obligatorio']  //si es requerio / obligatorio
    },
    email:{
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true        //con unique, mongo se va a encargar de no permitir insertar correos electronicos duplicados
    },                       //pero esto es algo que tenemos que validad todavia
    password:{
        type: String,
        required: [true, 'El password es obligatorio']     
    },
    img:{  // la img es como un url donde voy a manejar la imagen del usuario
        type: String    
    },
    role:{
        type: String,
        required: true,
        emun: ['ADMIN_ROLE', 'USER_ROLE']  //para validad el rol?   
    },
    state:{             //si esta activa o abandonada la cuenta
        type: Boolean,
        default: true     
    },
    google:{            //si fue creada con google o creada desde la mi pagina
        type: Boolean,
        default: false   
    },
})

//Esto lo que hace es sobre escribir el metodo toJSON
UsuarioSchema.methods.toJSON = function(){                  //importante en este caso se usa una function normal y no de flacha porque voy a usar el obj this y una funcion de flecha
    const { __v, password, ...usuario }= this.toObject();   // mantiene a lo que apunta el this, fuera de la misma, y yo necesito tener dentro el this poruqe va a ser referencia
    return usuario;                                         // a la estancia creada
}                                                           // los tres puntos se llama operador rest, es decir resto, es decir estoy sacando el __V y el password, y todo lo demas va a ser almacenado en "usuario", puede ser otro nombre, no hace falta que sea usuario
                                                            

module.exports = model( 'Usuario', UsuarioSchema );