//Ruta relacionada a los usuarios
const { Router } = require('express');
const { check } = require('express-validator');

const { esRoleValido,
        emailExiste } = require('../helpers/db-validators')
const { validarCampos } = require('../middlewares/validar-campos');

const { usuariosGet,
        usuariosPut,
        usuariosPost,
        usuariosDelete,
        usuariosPatch } = require('../controllers/usuarios.controller.js');




const router = Router(); //A estrouter es al cual le voy a configurar las rutas

router.get('/', usuariosGet);          //no existe this.app.get/put/post/delete, en routers extiste route.get/put/post/delete

router.put('/:id', usuariosPut);

router.post('/', [
    //middleware- 1er arg: Podemos especificarle que campo del body necesito revisar, 2do arg: msg de err, (con el check no se ve el error el cosola de una sino crea en la request los errores (si lo hay) de todos los middlewares, que de tal manera cuando lleguemos a usuariosPost pueda confirmar eso)
    check('name', 'El nombre es obligatorio').not().isEmpty(), // despues de punto estoy negando el estar vacio, es decir, que con .not().isEmpty(), el campo tiene que estar completado con un string para que no salte err
    check('password', 'La contraseña es obligatoria y mas de 6 caracteres').isLength({ min: 6 }), // despues del punto, verifica que el string tenga un min de se
    check('email', 'El correo no es valido').isEmail(),        // despues del punto es para decirle que es exactamente un email para compararlo
    check('email').custom(emailExiste),
    // check('role','No es un rol valido').isIn(['ADMIN_ROLE','USER_ROLE']), //despues del punto, estoy preguntando si existe en, en este caso un arreglo, se puede poner a mano, o llamar desde otra parte del proyecto
    check('role').custom(esRoleValido),
    validarCampos // es el ultimo, porque cuando ya tengo todos los checks hechos recien ahi voy a validar la informacion(es es un error o no), si este middleware pase, entonces ejecuta el controller usuariosPost, sino hasta ahi llega
], usuariosPost);
//para definir un middleware es el segundo argumento arriba ( , * , )
//pero si mando dos como esta aca ('/', usuariosPost), significa que el segundo es el controller
//el controller pasa a estar en el tercer argumento
//si se manda mas de 1 middleware, se tiene que mandar como un arreglo de middleware[]
router.patch('/', usuariosPatch);

router.delete('/', usuariosDelete)








module.exports = router;