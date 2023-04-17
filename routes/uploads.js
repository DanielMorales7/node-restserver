import { Router } from "express";
import { check } from "express-validator";
import { actualizarImagen, uploadFile } from "../controllers/uploadsController.js";
import { coleccionAllowed } from "../helpers/db-validators.js";
import { validarArchivo } from "../middlewares/validar-archivo.js";
import { validarCampos } from "../middlewares/validar-campos.js";
const routerUpload = Router();

routerUpload.route('/')
    .post(validarArchivo, uploadFile)

routerUpload.route('/:coleccion/:id')
    .put([
        check('id','El id debe de ser de Mongo').isMongoId(),
        check('coleccion').custom( c => coleccionAllowed(c,['usuariomodels','products'])),
        validarArchivo,
        validarCampos
    ],actualizarImagen)



export default routerUpload;