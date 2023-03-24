import { Router } from "express";
import { check } from "express-validator";
import { post_login } from "../controllers/authController.js";
import { validarCampos } from "../middlewares/validar-campos.js";
const routerAuth = Router();

routerAuth.route('/login')
    .post([
        check('correo', 'El correo es obligatorio').isEmail(),
        check('password', 'La contraseña es obligatoria').not().isEmpty(),
        validarCampos
    ],post_login)

export default routerAuth;