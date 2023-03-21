import { Router } from "express";
import { check } from "express-validator";
import { delete_users, get_users, patch_users, post_users, put_users } from "../controllers/userController.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import Role from "../models/rolModel.js";
const router = Router();

router.route('/')
    .get(get_users)
    .post([
        check('nombre','El nombre no debe ir vacio').not().isEmpty(),
        check('password','La contraseña debe contener 6 digitos').isLength({min:6}).not().isEmpty(),
        check('correo','El correo no es válido').isEmail(),
        // check('rol','No es un rol válido').isIn(['ADMIN_ROLE','USER_ROLE']),
        check('rol').custom( async(rol = '') => {
            const existeRol = await Role.findOne({rol});
            console.log(existeRol);
            if(!existeRol){
                throw new Error(`El rol ${rol} no está registrado en la BD`);
            }
        }),
        validarCampos
    ], post_users)
    .delete(delete_users)
    .patch(patch_users)

router.route('/:id')
    .put(put_users)



export default router;