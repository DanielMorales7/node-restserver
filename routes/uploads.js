import { Router } from "express";
import { check } from "express-validator";
import { uploadFile } from "../controllers/uploadsController.js";
import { validarCampos } from "../middlewares/validar-campos.js";
const routerUpload = Router();

routerUpload.route('/')
    .post(uploadFile)



export default routerUpload;