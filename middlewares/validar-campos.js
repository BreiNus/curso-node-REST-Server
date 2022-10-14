const { validationResult } = require('express-validator');

const validarCampos = ( req, res, next )=>{         //al crearr un middleware necesitan aparte del request y resolve el next, y va al fina
                                                    // lo que quiere decir es que si cayo en next sin caer en el error, que pase al siguiente middleware
    const errors = validationResult(req);           // y si ya no hay otro middleware seria al controller
    if(!errors.isEmpty()){
        return res.status(400).json(errors);
    }
    next();

}



module.exports={
    validarCampos
}