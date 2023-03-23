import { Router } from "express";
import { check } from "express-validator";
const router = Router();

import { delete_users, get_users, patch_users, post_users, put_users } from "../controllers/userController.js";
import { rolValidate, emailExist } from "../helpers/db-validators.js";
import { validarCampos } from "../middlewares/validar-campos.js";

router.route('/')
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
    .delete(delete_users)
    .patch(patch_users)

router.route('/:id')
    .put(put_users)



export default router;