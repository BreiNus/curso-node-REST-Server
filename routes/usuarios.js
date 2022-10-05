//Ruta relacionada a los usuarios

import { Router } from "express";

import { usuariosGet, 
        usuariosPut,
        usuariosPost,
        usuariosPatch,
        usuariosDelete } from "../controllers/usuarios.controller.js";



const router = Router(); //A estrouter es al cual le voy a configurar las rutas


router.get('/', usuariosGet);          //no existe this.app.get/put/post/delete, en routers extiste route.get/put/post/delete

router.put('/:id', usuariosPut);

router.post('/', usuariosPost);

router.patch('/', usuariosPatch);

router.delete('/', usuariosDelete)








export { router };