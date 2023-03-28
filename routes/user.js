import { Router } from "express";
import { check } from "express-validator";
const routerUsers = Router();

import { delete_users, get_users, patch_users, post_users, put_users } from "../controllers/userController.js";
import { rolValidate, emailExist, userExist } from "../helpers/db-validators.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import { validarJWT } from "../middlewares/validar-jwt.js";

routerUsers.route('/')
    .get(get_users)
    .post([
        check('nombre','El nombre no debe ir vacio').not().isEmpty(),
        check('password','La contraseña debe contener 6 digitos').isLength({min:6}).not().isEmpty(),
        check('correo','El correo no es válido').isEmail(),
        check('correo').custom( emailExist ),
        // check('rol','No es un rol válido').isIn(['ADMIN_ROLE','USER_ROLE']),
        check('rol').custom( rolValidate ),
        validarCampos
    ], post_users)
    .patch(patch_users)

routerUsers.route('/:id')
    .put([
    validarJWT,
    check('id','No es un ID válido').isMongoId(),
    check('id').custom(userExist),
    validarCampos,
    ], put_users)
    .delete(delete_users)





export default routerUsers;